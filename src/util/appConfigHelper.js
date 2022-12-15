/* istanbul ignore file */

export const getData = name => {
  const result = localStorage.getItem(name);
  if (!result && name === 'CLEENG_AUTH_TOKEN') {
    console.error(`Unable to get CLEENG_AUTH_TOKEN from local storage`);
    return null;
  }
  return result;
};

export const setData = (name, value) => localStorage.setItem(name, value);

export const removeData = name => localStorage.removeItem(name);

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

export const setCheckoutPayPalUrls = urls => {
  if (urls) {
    const { successUrl, cancelUrl, errorUrl } = urls;
    setData('CLEENG_CHECKOUT_PP_SUCCESS', successUrl);
    setData('CLEENG_CHECKOUT_PP_CANCEL', cancelUrl);
    setData('CLEENG_CHECKOUT_PP_ERROR', errorUrl);
    return true;
  }
  return false;
};

export const setMyAccountPayPalUrls = urls => {
  if (urls) {
    const { successUrl, cancelUrl, errorUrl } = urls;
    setData('CLEENG_MYACCOUNT_PP_SUCCESS', successUrl);
    setData('CLEENG_MYACCOUNT_PP_CANCEL', cancelUrl);
    setData('CLEENG_MYACCOUNT_PP_ERROR', errorUrl);
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

export const setOfferSelectionUrl = url => {
  if (url) {
    setData('CLEENG_OFFER_SELECTION_URL', url);
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
    return JSON.parse(theme);
  }
  return false;
};

export default {
  setPublisher,
  setOffer,
  setEnvironment,
  setTheme,
  setCheckoutPayPalUrls,
  setMyAccountPayPalUrls,
  setMyAccountUrl,
  setOfferSelectionUrl,
  setJWT,
  setRefreshToken
};
