import Auth from 'services/auth';

vi.mock('services/auth', () => ({ default: { logout: vi.fn() } }));

// No environment stored, so requests go to the sandbox API.
const API_URL = 'https://mediastoreapi-sandbox.cleeng.com';
const REFRESH_URL = `${API_URL}/auths/refresh_token`;
const ORDERS_URL = `${API_URL}/orders`;

const jwtFor = (customerId, expiresInSeconds) =>
  [
    btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })),
    btoa(
      JSON.stringify({
        customerId,
        exp: Math.floor(Date.now() / 1000) + expiresInSeconds
      })
    ),
    'signature'
  ].join('.');

// The previous customer's session: a JWT that has expired and a refresh token
// that has not, so the next request refreshes it.
const PREVIOUS_CUSTOMER = {
  jwt: jwtFor(111, -3600),
  refreshToken: 'previous-customer-refresh'
};
const NEW_CUSTOMER = {
  jwt: jwtFor(222, 900),
  refreshToken: 'new-customer-refresh'
};

const signIn = ({ jwt, refreshToken }) => {
  localStorage.setItem('CLEENG_AUTH_TOKEN', jwt);
  localStorage.setItem('CLEENG_REFRESH_TOKEN', refreshToken);
};

const storedSession = () => ({
  jwt: localStorage.getItem('CLEENG_AUTH_TOKEN'),
  refreshToken: localStorage.getItem('CLEENG_REFRESH_TOKEN')
});

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });

describe('fetchWithJWT token refresh', () => {
  const fetchMock = vi.fn();
  let fetchWithJWT;

  const tokenSentWith = (url) =>
    fetchMock.mock.calls.find(([calledUrl]) => calledUrl === url)?.[1]?.headers
      ?.Authorization;

  // The publisher sets the new customer's tokens (Config.setJWT,
  // Config.setRefreshToken) while the previous customer's refresh is in flight.
  const switchCustomerDuringRefresh = (respondToRefresh) => {
    fetchMock.mockImplementation(async (url) => {
      if (url === REFRESH_URL) {
        signIn(NEW_CUSTOMER);
        return respondToRefresh();
      }
      return jsonResponse({ responseData: {}, errors: [] });
    });
  };

  beforeEach(async () => {
    // The helper keeps its refresh state per module, so each test loads it anew.
    vi.resetModules();
    ({ default: fetchWithJWT } = await import('./fetchHelper'));
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    signIn(PREVIOUS_CUSTOMER);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchMock.mockReset();
    Auth.logout.mockClear();
    localStorage.clear();
  });

  it('stores the refreshed tokens when the session is unchanged', async () => {
    const refreshed = { jwt: jwtFor(111, 900), refreshToken: 'rotated' };
    fetchMock.mockImplementation(async (url) =>
      url === REFRESH_URL
        ? jsonResponse({ responseData: refreshed, errors: [] })
        : jsonResponse({ responseData: {}, errors: [] })
    );

    await fetchWithJWT(ORDERS_URL, { method: 'POST' });

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      refreshToken: PREVIOUS_CUSTOMER.refreshToken
    });
    expect(storedSession()).toEqual(refreshed);
    expect(tokenSentWith(ORDERS_URL)).toBe(`Bearer ${refreshed.jwt}`);
  });

  it('logs out when the refresh of an unchanged session is rejected', async () => {
    fetchMock.mockImplementation(async () =>
      jsonResponse(
        { errors: ['Refresh token is expired or does not exist'] },
        401
      )
    );

    await expect(fetchWithJWT(ORDERS_URL)).rejects.toThrow(
      'Failed to refresh token'
    );

    expect(Auth.logout).toHaveBeenCalled();
  });

  // SXP-1355
  describe('when the customer changes while the refresh is in flight', () => {
    it('keeps the new customer and sends the request as them', async () => {
      switchCustomerDuringRefresh(() =>
        jsonResponse({
          responseData: {
            jwt: jwtFor(111, 900),
            refreshToken: 'previous-customer-refresh-rotated'
          },
          errors: []
        })
      );

      await fetchWithJWT(ORDERS_URL, { method: 'POST' });

      expect(storedSession()).toEqual(NEW_CUSTOMER);
      expect(tokenSentWith(ORDERS_URL)).toBe(`Bearer ${NEW_CUSTOMER.jwt}`);
      expect(Auth.logout).not.toHaveBeenCalled();
    });

    it('does not log the new customer out when the refresh is rejected', async () => {
      switchCustomerDuringRefresh(() =>
        jsonResponse(
          { errors: ['Refresh token is expired or does not exist'] },
          401
        )
      );

      await fetchWithJWT(ORDERS_URL, { method: 'POST' });

      expect(storedSession()).toEqual(NEW_CUSTOMER);
      expect(tokenSentWith(ORDERS_URL)).toBe(`Bearer ${NEW_CUSTOMER.jwt}`);
      expect(Auth.logout).not.toHaveBeenCalled();
    });

    it('does not log the new customer out when the refresh gets no response', async () => {
      fetchMock.mockImplementation(async (url) => {
        if (url === REFRESH_URL) {
          signIn(NEW_CUSTOMER);
          throw new TypeError('Failed to fetch');
        }
        return jsonResponse({ responseData: {}, errors: [] });
      });

      await fetchWithJWT(ORDERS_URL, { method: 'POST' });

      expect(storedSession()).toEqual(NEW_CUSTOMER);
      expect(Auth.logout).not.toHaveBeenCalled();
    });
  });
});
