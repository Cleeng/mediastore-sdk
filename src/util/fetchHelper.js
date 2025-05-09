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

const isJWTExpired = () => {
  const jwt = retrieveJWT();
  if (jwt) {
    const decoded = jwtDecode(jwt);
    return Date.now() / 1000 > decoded.exp;
  }
  return true;
};

const fetchNewTokens = async () => {
  const API_URL = getApiURL();
  const environment = retrieveEnvironment();
  IS_FETCHING_REFRESH_TOKEN = true;
  const response = await fetch(`${API_URL}/auths/refresh_token`, {
    method: 'POST',
    body: JSON.stringify({ refreshToken: getData('CLEENG_REFRESH_TOKEN') }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(environment === 'production' && {
        'X-Requested-By': `mediastore-sdk@${version}`
      })
    }
  });
  const responseJSON = await response.json();
  if (responseJSON.errors.length) {
    eventDispatcher(MSSDK_AUTH_FAILED, {
      source: 'fetchHelper',
      message: responseJSON.errors[0],
      refreshToken: getData('CLEENG_REFRESH_TOKEN')
    });
  }
  setData(JWT, responseJSON.responseData.jwt);
  setData(REFRESH_TOKEN, responseJSON.responseData.refreshToken);
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
    } else {
      return new Promise((resolve, reject) => {
        const isRefreshTokenFetched = () => {
          if (REFRESH_TOKEN_ERROR) {
            reject(new Error('Failed to refresh token'));
            return;
          }
          if (!IS_FETCHING_REFRESH_TOKEN) {
            resolve(generatePromiseWithHeaders(url, options));
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
