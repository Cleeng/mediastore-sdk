import merge from 'lodash.merge';
import jwtDecode from 'jwt-decode';
import Auth from 'services/auth';
import { getData, setData } from 'util/appConfigHelper';
import getApiURL from 'util/environmentHelper';
import eventDispatcher, { MSSDK_AUTH_FAILED } from './eventDispatcher';
import { version } from '../../package.json';

const JWT = 'CLEENG_AUTH_TOKEN';
const REFRESH_TOKEN = 'CLEENG_REFRESH_TOKEN';
const ENVIRONMENT = 'CLEENG_ENVIRONMENT';

const retrieveJWT = () => getData(JWT);
const retrieveRefreshToken = () => getData(REFRESH_TOKEN);
const retrieveEnvironment = () => getData(ENVIRONMENT);

let IS_FETCHING_REFRESH_TOKEN = false;
let REFRESH_TOKEN_ERROR = false;

// The tokens a request is made with. A refresh result is dropped when they
// change while it is in flight, so it never overwrites newer tokens.
const retrieveSession = () => ({
  jwt: retrieveJWT(),
  refreshToken: retrieveRefreshToken()
});

const isSameTokens = (a, b) =>
  a.jwt === b.jwt && a.refreshToken === b.refreshToken;

// The tokens the last refresh replaced and the ones it stored.
let LAST_ROTATION = null;

const customerOf = (jwt) => {
  if (!jwt) {
    return null;
  }
  try {
    return jwtDecode(jwt).customerId ?? null;
  } catch {
    return null;
  }
};

// A request goes out only for the customer it was made for: the publisher can
// switch customers, or log out, at any time, and a request built for one
// customer must not be sent with another customer's tokens. The tokens alone
// can change for the same customer (another tab refreshing the shared session,
// the publisher re-issuing them), so compare the customer.
const isSameCustomer = (session) => {
  const current = retrieveSession();
  const customerId = customerOf(session.jwt);
  if (customerId === null) {
    // Made with a refresh token alone: only its own tokens, or this refresh's
    // rotation of them, are known to be the same customer.
    return (
      isSameTokens(session, current) ||
      (LAST_ROTATION !== null &&
        isSameTokens(session, LAST_ROTATION.from) &&
        isSameTokens(current, LAST_ROTATION.to))
    );
  }
  return customerOf(current.jwt) === customerId;
};

const customerChangedError = () =>
  new Error('The signed-in customer changed before the request could be sent');

const isJWTExpired = () => {
  const jwt = retrieveJWT();
  if (jwt) {
    const decoded = jwtDecode(jwt);
    return Date.now() / 1000 > decoded.exp;
  }
  return true;
};

const requestNewTokens = async (refreshToken) => {
  const API_URL = getApiURL();
  const environment = retrieveEnvironment();
  const response = await fetch(`${API_URL}/auths/refresh_token`, {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(environment === 'production' && {
        'X-Requested-By': `mediastore-sdk@${version}`
      })
    }
  });
  return response.json();
};

const fetchNewTokens = async () => {
  const session = retrieveSession();
  IS_FETCHING_REFRESH_TOKEN = true;

  // SXP-1355: the publisher can set another customer's tokens, or log out,
  // while this request is in flight. The result belongs to the session it was
  // sent for: writing it would sign the previous customer back in, and a failed
  // one would log the new customer out. Leave the session that replaced it alone.
  const result = await requestNewTokens(session.refreshToken).then(
    (responseJSON) => ({ responseJSON }),
    (error) => ({ error })
  );

  if (!isSameTokens(retrieveSession(), session)) {
    return;
  }
  if ('error' in result) {
    throw result.error;
  }

  const { responseJSON } = result;
  if (responseJSON.errors.length) {
    eventDispatcher(MSSDK_AUTH_FAILED, {
      source: 'fetchHelper',
      message: responseJSON.errors[0],
      refreshToken: session.refreshToken
    });
  }
  setData(JWT, responseJSON.responseData.jwt);
  setData(REFRESH_TOKEN, responseJSON.responseData.refreshToken);
  LAST_ROTATION = { from: session, to: retrieveSession() };
};

const generatePromiseWithHeaders = (url, options) => {
  const token = retrieveJWT();
  const environment = retrieveEnvironment();

  let optionsWithToken = options;
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(environment === 'production' && {
          'X-Requested-By': `mediastore-sdk@${version}`
        })
      }
    });
  }

  return window.fetch(url, optionsWithToken);
};

const fetchWithJWT = async (url, options = {}) => {
  const isExpired = isJWTExpired();
  const refreshToken = retrieveRefreshToken();
  const session = retrieveSession();

  if (isExpired && !refreshToken) {
    eventDispatcher(MSSDK_AUTH_FAILED, {
      source: 'fetchHelper',
      message:
        'Unable to get CLEENG_REFRESH_TOKEN from local storage or redux store'
    });
    Auth.logout();
  }

  if (isExpired && refreshToken) {
    if (!IS_FETCHING_REFRESH_TOKEN) {
      // An earlier failed refresh belonged to its own session.
      REFRESH_TOKEN_ERROR = false;
      await fetchNewTokens()
        .then(() => {
          IS_FETCHING_REFRESH_TOKEN = false;
        })
        .catch(() => {
          IS_FETCHING_REFRESH_TOKEN = false;
          REFRESH_TOKEN_ERROR = true;
          Auth.logout();
          return Promise.reject(new Error('Failed to refresh token'));
        });
      if (!isSameCustomer(session)) {
        throw customerChangedError();
      }
    } else {
      return new Promise((resolve, reject) => {
        const isRefreshTokenFetched = () => {
          if (REFRESH_TOKEN_ERROR) {
            reject(new Error('Failed to refresh token'));
            return;
          }
          if (!IS_FETCHING_REFRESH_TOKEN) {
            if (isSameTokens(retrieveSession(), session)) {
              // The refresh was for a session this one replaced, so this
              // one still has to be refreshed itself.
              resolve(fetchWithJWT(url, options));
            } else if (isSameCustomer(session)) {
              resolve(generatePromiseWithHeaders(url, options));
            } else {
              reject(customerChangedError());
            }
            return;
          }
          setTimeout(() => {
            isRefreshTokenFetched();
          }, 500);
        };
        isRefreshTokenFetched();
      });
    }
  }

  return generatePromiseWithHeaders(url, options);
};

export const fetchWithHeaders = async (url, options = {}) => {
  const environment = retrieveEnvironment();
  const optionsWithToken = merge({}, options, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(environment === 'production' && {
        'X-Requested-By': `mediastore-sdk@${version}`
      })
    }
  });

  return window.fetch(url, optionsWithToken);
};

export default fetchWithJWT;
