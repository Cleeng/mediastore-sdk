import merge from 'lodash.merge';
import jwtDecode from 'jwt-decode';
import { getData, setData } from 'util/appConfigHelper';
import Auth from 'services/auth';
import getApiURL from 'util/environmentHelper';
import { version } from '../../package.json';

const JWT = 'CLEENG_AUTH_TOKEN';
const REFRESH_TOKEN = 'CLEENG_REFRESH_TOKEN';

const retrieveJWT = () => getData(JWT);
const retrieveRefreshToken = () => getData(REFRESH_TOKEN);

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
  IS_FETCHING_REFRESH_TOKEN = true;
  const response = await fetch(`${API_URL}/auths/refresh_token`, {
    method: 'POST',
    body: JSON.stringify({ refreshToken: getData('CLEENG_REFRESH_TOKEN') }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const responseJSON = await response.json();
  setData(JWT, responseJSON.responseData.jwt);
  setData(REFRESH_TOKEN, responseJSON.responseData.refreshToken);
};

const generatePromiseWithHeaders = (url, options) => {
  const token = retrieveJWT();

  let optionsWithToken = options;
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(getData('CLEENG_ENVIRONMENT') === 'production' && {
          'x-mssdk-components': version
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
          return new Promise((resolve, reject) => reject());
        });
    } else {
      return new Promise((resolve, reject) => {
        const isRefreshTokenFetched = () => {
          if (REFRESH_TOKEN_ERROR) {
            reject();
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
  let optionsWithToken = options;
  optionsWithToken = merge({}, options, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return window.fetch(url, optionsWithToken);
};

export default fetchWithJWT;
