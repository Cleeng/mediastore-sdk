import i18n from 'i18next';
import store from 'redux/store';
import {
  setData as setDataInRedux,
  removeData as removeDataFromRedux
} from 'redux/appConfig';
import {
  init as initPublisherConfig,
  updateHiddenPaymentMethods
} from 'redux/publisherConfigSlice';

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

export const getData = name => {
  const result = isLocalStorageAvailable()
    ? localStorage.getItem(name)
    : store.getState().appConfig[name];
  if (!result && name === 'CLEENG_AUTH_TOKEN') {
    // eslint-disable-next-line no-console
    console.error(
      `Unable to get CLEENG_AUTH_TOKEN from local storage or redux store`
    );
    return null;
  }
  return result;
};

export const setData = (name, value) =>
  isLocalStorageAvailable()
    ? localStorage.setItem(name, value)
    : store.dispatch(setDataInRedux({ name, value }));

export const removeData = name =>
  isLocalStorageAvailable()
    ? localStorage.removeItem(name)
    : store.dispatch(removeDataFromRedux({ name }));

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
    store.dispatch(initPublisherConfig({ publisherId }));
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

export const setTermsUrl = termsUrl => {
  if (termsUrl) {
    setData('CLEENG_TERMS_URL', termsUrl);
    store.dispatch(initPublisherConfig({ termsUrl }));
    return true;
  }
  return false;
};

export const setResetUrl = resetUrl => {
  if (resetUrl) {
    store.dispatch(initPublisherConfig({ resetUrl }));
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

export const setVisibleAdyenPaymentMethods = visiblePaymentMethods => {
  store.dispatch(
    initPublisherConfig({
      visiblePaymentMethods
    })
  );
  return true;
};

export const setHidePayPal = () => {
  store.dispatch(
    initPublisherConfig({
      isPayPalHidden: true
    })
  );
  return true;
};

export const setHiddenPaymentMethods = hiddenPaymentMethods => {
  store.dispatch(updateHiddenPaymentMethods(hiddenPaymentMethods));
  return true;
};

export const setEnable3DSRedirectFlow = () => {
  store.dispatch(
    initPublisherConfig({
      enable3DSRedirectFlow: true
    })
  );
  return true;
};

export const setLanguage = async language => {
  const BASE_URL = window.location.origin;

  if (!i18n.hasResourceBundle(language, 'translations')) {
    const data = await fetch(
      `${BASE_URL}/cleeng-translations/${language}/translations.json`
    )
      .then(response => {
        return response.json();
      })
      // Do not remove catch below
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});

    i18n.addResourceBundle(language, 'translations', data, true, true);
  }

  i18n.changeLanguage(language);

  return true;
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
  setRefreshToken,
  setTermsUrl,
  setResetUrl,
  setHidePayPal,
  setVisibleAdyenPaymentMethods,
  setHiddenPaymentMethods,
  setLanguage,
  setEnable3DSRedirectFlow
};
