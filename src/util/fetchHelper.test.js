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

const refreshedFor = (customerId, refreshToken) =>
  jsonResponse({
    responseData: { jwt: jwtFor(customerId, 900), refreshToken },
    errors: []
  });

// A refresh response the test releases when it chooses.
const deferred = () => {
  let resolve;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

const CUSTOMER_CHANGED =
  'The signed-in customer changed before the request could be sent';

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

  it('logs out when the refresh of an unchanged session answers with no body', async () => {
    fetchMock.mockImplementation(async () => jsonResponse(null));

    await expect(fetchWithJWT(ORDERS_URL)).rejects.toThrow(
      'Failed to refresh token'
    );

    expect(Auth.logout).toHaveBeenCalled();
  });

  // SXP-1355
  describe('when the customer changes while the refresh is in flight', () => {
    it('keeps the new customer and does not send the request made for the previous one', async () => {
      switchCustomerDuringRefresh(() =>
        refreshedFor(111, 'previous-customer-refresh-rotated')
      );

      await expect(
        fetchWithJWT(ORDERS_URL, { method: 'POST' })
      ).rejects.toThrow(CUSTOMER_CHANGED);

      expect(storedSession()).toEqual(NEW_CUSTOMER);
      expect(tokenSentWith(ORDERS_URL)).toBeUndefined();
      expect(Auth.logout).not.toHaveBeenCalled();
    });

    it('does not log the new customer out when the refresh is rejected', async () => {
      switchCustomerDuringRefresh(() =>
        jsonResponse(
          { errors: ['Refresh token is expired or does not exist'] },
          401
        )
      );

      await expect(
        fetchWithJWT(ORDERS_URL, { method: 'POST' })
      ).rejects.toThrow(CUSTOMER_CHANGED);

      expect(storedSession()).toEqual(NEW_CUSTOMER);
      expect(tokenSentWith(ORDERS_URL)).toBeUndefined();
      expect(Auth.logout).not.toHaveBeenCalled();
    });

    it('does not log the new customer out when the refresh gets no response', async () => {
      switchCustomerDuringRefresh(() => {
        throw new TypeError('Failed to fetch');
      });

      await expect(
        fetchWithJWT(ORDERS_URL, { method: 'POST' })
      ).rejects.toThrow(CUSTOMER_CHANGED);

      expect(storedSession()).toEqual(NEW_CUSTOMER);
      expect(Auth.logout).not.toHaveBeenCalled();
    });

    // Tabs share the storage. Both refresh when the JWT expires; the one that
    // loses gets a rejected refresh, since the other rotated the refresh token
    // first.
    it('sends the request when another tab refreshed the same customer first', async () => {
      const otherTab = {
        jwt: jwtFor(111, 900),
        refreshToken: 'previous-customer-refresh-rotated'
      };
      fetchMock.mockImplementation(async (url) => {
        if (url === REFRESH_URL) {
          signIn(otherTab);
          return jsonResponse({ errors: ['Refresh token is invalid'] }, 401);
        }
        return jsonResponse({ responseData: {}, errors: [] });
      });

      await fetchWithJWT(ORDERS_URL);

      expect(tokenSentWith(ORDERS_URL)).toBe(`Bearer ${otherTab.jwt}`);
      expect(storedSession()).toEqual(otherTab);
      expect(Auth.logout).not.toHaveBeenCalled();
    });

    it('sends the request with tokens the publisher re-issued for the same customer', async () => {
      const reissued = { jwt: jwtFor(111, 900), refreshToken: 'reissued' };
      fetchMock.mockImplementation(async (url) => {
        if (url === REFRESH_URL) {
          signIn(reissued);
          return refreshedFor(111, 'previous-customer-refresh-rotated');
        }
        return jsonResponse({ responseData: {}, errors: [] });
      });

      await fetchWithJWT(ORDERS_URL);

      expect(tokenSentWith(ORDERS_URL)).toBe(`Bearer ${reissued.jwt}`);
      expect(storedSession()).toEqual(reissued);
    });

    // Config.setRefreshToken is optional, so a publisher can switch customers
    // with Config.setJWT alone.
    it('does not write the previous customer over a JWT set on its own', async () => {
      fetchMock.mockImplementation(async (url) => {
        if (url === REFRESH_URL) {
          localStorage.setItem('CLEENG_AUTH_TOKEN', NEW_CUSTOMER.jwt);
          return refreshedFor(111, 'previous-customer-refresh-rotated');
        }
        return jsonResponse({ responseData: {}, errors: [] });
      });

      await expect(fetchWithJWT(ORDERS_URL)).rejects.toThrow(CUSTOMER_CHANGED);

      expect(storedSession()).toEqual({
        jwt: NEW_CUSTOMER.jwt,
        refreshToken: PREVIOUS_CUSTOMER.refreshToken
      });
      expect(tokenSentWith(ORDERS_URL)).toBeUndefined();
    });

    it('does not sign the previous customer back in after a logout', async () => {
      fetchMock.mockImplementation(async (url) => {
        if (url === REFRESH_URL) {
          localStorage.clear();
          return refreshedFor(111, 'previous-customer-refresh-rotated');
        }
        return jsonResponse({ responseData: {}, errors: [] });
      });

      await expect(fetchWithJWT(ORDERS_URL)).rejects.toThrow(CUSTOMER_CHANGED);

      expect(storedSession()).toEqual({ jwt: null, refreshToken: null });
      expect(tokenSentWith(ORDERS_URL)).toBeUndefined();
    });
  });

  // Requests made while a refresh is in flight wait for it.
  describe('requests waiting for a refresh', () => {
    const NEW_CUSTOMER_EXPIRED = {
      jwt: jwtFor(222, -60),
      refreshToken: 'new-customer-refresh'
    };

    const ordersSentWith = () =>
      fetchMock.mock.calls
        .filter(([calledUrl]) => calledUrl === ORDERS_URL)
        .map(([, options]) => options.headers.Authorization);

    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['setTimeout'] });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('sends them with the refreshed tokens of the same customer', async () => {
      const refresh = deferred();
      fetchMock.mockImplementation(async (url) =>
        url === REFRESH_URL
          ? refresh.promise
          : jsonResponse({ responseData: {}, errors: [] })
      );

      const first = fetchWithJWT(ORDERS_URL);
      const waiting = fetchWithJWT(ORDERS_URL);
      refresh.resolve(refreshedFor(111, 'previous-customer-refresh-rotated'));
      await vi.advanceTimersByTimeAsync(500);
      await Promise.all([first, waiting]);

      const { jwt } = storedSession();
      expect(ordersSentWith()).toEqual([`Bearer ${jwt}`, `Bearer ${jwt}`]);
    });

    it('does not send one made for the previous customer', async () => {
      const refresh = deferred();
      fetchMock.mockImplementation(async (url) =>
        url === REFRESH_URL
          ? refresh.promise
          : jsonResponse({ responseData: {}, errors: [] })
      );

      const first = fetchWithJWT(ORDERS_URL).catch((error) => error);
      const waiting = fetchWithJWT(ORDERS_URL).catch((error) => error);
      signIn(NEW_CUSTOMER);
      refresh.resolve(refreshedFor(111, 'previous-customer-refresh-rotated'));
      await vi.advanceTimersByTimeAsync(500);

      expect((await first).message).toBe(CUSTOMER_CHANGED);
      expect((await waiting).message).toBe(CUSTOMER_CHANGED);
      expect(ordersSentWith()).toEqual([]);
      expect(storedSession()).toEqual(NEW_CUSTOMER);
    });

    it("refreshes the new customer's own session for one the new customer made", async () => {
      const previousRefresh = deferred();
      const newRefreshed = { jwt: jwtFor(222, 900), refreshToken: 'rotated' };
      fetchMock.mockImplementation(async (url, options) => {
        if (url !== REFRESH_URL) {
          return jsonResponse({ responseData: {}, errors: [] });
        }
        const { refreshToken } = JSON.parse(options.body);
        return refreshToken === PREVIOUS_CUSTOMER.refreshToken
          ? previousRefresh.promise
          : jsonResponse({ responseData: newRefreshed, errors: [] });
      });

      const previous = fetchWithJWT(ORDERS_URL).catch((error) => error);
      signIn(NEW_CUSTOMER_EXPIRED);
      const made = fetchWithJWT(ORDERS_URL);
      previousRefresh.resolve(
        refreshedFor(111, 'previous-customer-refresh-rotated')
      );
      await vi.advanceTimersByTimeAsync(500);
      await made;

      expect((await previous).message).toBe(CUSTOMER_CHANGED);
      expect(ordersSentWith()).toEqual([`Bearer ${newRefreshed.jwt}`]);
      expect(storedSession()).toEqual(newRefreshed);
    });

    it('lets them through after an earlier refresh failed', async () => {
      fetchMock.mockImplementation(async (url) =>
        url === REFRESH_URL
          ? jsonResponse({ errors: ['Refresh token is expired'] }, 401)
          : jsonResponse({ responseData: {}, errors: [] })
      );
      await expect(fetchWithJWT(ORDERS_URL)).rejects.toThrow(
        'Failed to refresh token'
      );

      signIn(NEW_CUSTOMER_EXPIRED);
      const refresh = deferred();
      fetchMock.mockImplementation(async (url) =>
        url === REFRESH_URL
          ? refresh.promise
          : jsonResponse({ responseData: {}, errors: [] })
      );
      const first = fetchWithJWT(ORDERS_URL);
      const waiting = fetchWithJWT(ORDERS_URL);
      refresh.resolve(refreshedFor(222, 'rotated'));
      await vi.advanceTimersByTimeAsync(500);
      await Promise.all([first, waiting]);

      const { jwt } = storedSession();
      expect(ordersSentWith()).toEqual([`Bearer ${jwt}`, `Bearer ${jwt}`]);
    });
  });
});
