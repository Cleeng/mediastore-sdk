/* istanbul ignore file */

import store from 'redux/store';
import {
  setData as setDataInRedux,
  removeData as removeDataFromRedux
} from 'redux/appConfig';

const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem('CLEENG_LS', 'yes');
    if (localStorage.getItem('CLEENG_LS') === 'yes') {
      localStorage.removeItem('CLEENG_LS');
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getData = name =>
  isLocalStorageAvailable()
    ? localStorage.getItem(name)
    : store.getState().appConfig[name];

export const setData = (name, value) =>
  isLocalStorageAvailable()
    ? localStorage.setItem(name, value)
    : store.dispatch(setDataInRedux({ name, value }));

export const removeData = name =>
  isLocalStorageAvailable()
    ? localStorage.removeItem(name)
    : store.dispatch(removeDataFromRedux({ name }));

export const sendMessage = msg => {
  if (window.opener) {
    window.opener.postMessage(msg, '*');
  } else if (window.top) {
    window.top.postMessage(msg, '*');
  }
};

export const setJWT = jwt => {
  if (jwt) {
    setData('CLEENG_AUTH_TOKEN', jwt);
    return true;
  }
  return false;
};
export const setRefreshToken = refreshToken => {
  if (refreshToken) {
    setData('CLEENG_REFRESH_TOKEN', refreshToken);
    return true;
  }
  return false;
};

export const setPublisher = publisherId => {
  if (publisherId) {
    setData('CLEENG_PUBLISHER_ID', publisherId);
    return true;
  }
  return false;
};

export const setOffer = offerId => {
  if (offerId) {
    setData('CLEENG_OFFER_ID', offerId);
    return true;
  }
  return false;
};

export const setEnvironment = env => {
  if (env) {
    setData('CLEENG_ENVIRONMENT', env);
    return true;
  }
  return false;
};

export const setPaypalUrls = urls => {
  if (urls) {
    const { successUrl, cancelUrl, errorUrl } = urls;
    setData('CLEENG_PP_SUCCESS', successUrl);
    setData('CLEENG_PP_CANCEL', cancelUrl);
    setData('CLEENG_PP_ERROR', errorUrl);
    return true;
  }
  return false;
};

export const setMyAccountUrl = url => {
  if (url) {
    setData('CLEENG_MY_ACCOUNT_URL', url);
    return true;
  }
  return false;
};

export const setTheme = theme => {
  const themeString = JSON.stringify(theme);
  if (theme) {
    setData('CLEENG_THEME', themeString);
    return true;
  }
  return false;
};

export const getTheme = () => {
  const theme = getData('CLEENG_THEME');
  if (theme) {
    const themeJSON = JSON.parse(theme);
    return themeJSON;
  }
  return false;
};

export const setAdyenConfig = config => {
  const configString = JSON.stringify(config);
  if (configString) {
    setData('CLEENG_ADYEN', configString);
    return true;
  }
  return false;
};

export const getAdyenConfig = () => {
  const config = getData('CLEENG_ADYEN');
  if (config) {
    const configJSON = JSON.parse(config);
    return configJSON;
  }
  return false;
};

export default {
  setPublisher,
  setOffer,
  setEnvironment,
  setTheme,
  setPaypalUrls,
  setMyAccountUrl,
  setAdyenConfig,
  getAdyenConfig,
  setJWT,
  setRefreshToken
};
