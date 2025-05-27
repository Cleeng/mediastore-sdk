import i18n from 'i18next';
import store from 'appRedux/store';
import {
  setData as setDataInRedux,
  removeData as removeDataFromRedux
} from 'appRedux/appConfig';
import {
  init as initPublisherConfig,
  updateGoogleRecaptcha,
  updateHiddenPaymentMethods
} from 'appRedux/publisherConfigSlice';

let hasPublisherIdBeenSet = false;

const assignKeysToPublisherId = () => {
  const entriesToUpdate = [];

  for (let keyIndex = 0; keyIndex <= localStorage.length - 1; keyIndex += 1) {
    const key = localStorage.key(keyIndex);
    if (
      key !== 'CLEENG_PUBLISHER_ID' &&
      key !== 'CLEENG_LS' &&
      key?.startsWith('CLEENG_')
    ) {
      const value = localStorage.getItem(key);

      entriesToUpdate.push({ key, value });
    }
  }

  entriesToUpdate.forEach(({ key, value }) => {
    localStorage.removeItem(key);
    setData(key, value);
  });
};

const getStorageKey = (keyName) => {
  console.log('########## mssdk getStorageKey 11111', {
    keyName,
    hasPublisherIdBeenSet
  });

  if (!hasPublisherIdBeenSet) {
    return keyName;
  }

  const publisherId = localStorage.getItem('CLEENG_PUBLISHER_ID');

  console.log('########## mssdk getStorageKey 222222', {
    keyName,
    hasPublisherIdBeenSet,
    publisherId,
    result: publisherId ? `${publisherId}_${keyName}` : keyName
  });

  return publisherId ? `${publisherId}_${keyName}` : keyName;
};

const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem(getStorageKey('CLEENG_LS'), 'yes');
    if (localStorage.getItem(getStorageKey('CLEENG_LS')) === 'yes') {
      localStorage.removeItem(getStorageKey('CLEENG_LS'));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getData = (name) => {
  console.log('######### mssdk getData called', {
    name,
    result: localStorage.getItem(getStorageKey(name)),
    environment: localStorage.getItem(getStorageKey('CLEENG_ENVIRONMENT'))
  });

  const result = isLocalStorageAvailable()
    ? localStorage.getItem(getStorageKey(name))
    : store.getState().appConfig[name];
  if (!result && getStorageKey(name) === 'CLEENG_AUTH_TOKEN') {
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
    ? localStorage.setItem(getStorageKey(name), value)
    : store.dispatch(setDataInRedux({ name, value }));

export const removeData = (name) =>
  isLocalStorageAvailable()
    ? localStorage.removeItem(getStorageKey(name))
    : store.dispatch(removeDataFromRedux({ name }));

export const setJWT = (jwt) => {
  if (jwt) {
    setData('CLEENG_AUTH_TOKEN', jwt);
    return true;
  }
  return false;
};
export const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    setData('CLEENG_REFRESH_TOKEN', refreshToken);
    return true;
  }
  return false;
};

export const setPublisher = (publisherId) => {
  if (publisherId) {
    hasPublisherIdBeenSet = true;

    if (isLocalStorageAvailable()) {
      console.log('########### mssdk setpublisher called', { publisherId });

      localStorage.setItem('CLEENG_PUBLISHER_ID', publisherId);
      assignKeysToPublisherId();
      console.log('########### mssdk assigning finished', { publisherId });
    } else {
      store.dispatch(
        setDataInRedux({ name: 'CLEENG_PUBLISHER_ID', value: publisherId })
      );
    }

    store.dispatch(initPublisherConfig({ publisherId }));
    return true;
  }
  return false;
};

export const setOffer = (offerId) => {
  if (offerId) {
    setData('CLEENG_OFFER_ID', offerId);
    return true;
  }
  return false;
};

export const setEnvironment = (env) => {
  if (env) {
    setData('CLEENG_ENVIRONMENT', env);
    return true;
  }
  return false;
};

export const setCheckoutPayPalUrls = (urls) => {
  if (urls) {
    const { successUrl, cancelUrl, errorUrl } = urls;
    setData('CLEENG_CHECKOUT_PP_SUCCESS', successUrl);
    setData('CLEENG_CHECKOUT_PP_CANCEL', cancelUrl);
    setData('CLEENG_CHECKOUT_PP_ERROR', errorUrl);
    return true;
  }
  return false;
};

export const setMyAccountPayPalUrls = (urls) => {
  if (urls) {
    const { successUrl, cancelUrl, errorUrl } = urls;
    setData('CLEENG_MYACCOUNT_PP_SUCCESS', successUrl);
    setData('CLEENG_MYACCOUNT_PP_CANCEL', cancelUrl);
    setData('CLEENG_MYACCOUNT_PP_ERROR', errorUrl);
    return true;
  }
  return false;
};

export const setMyAccountUrl = (url) => {
  if (url) {
    setData('CLEENG_MY_ACCOUNT_URL', url);
    return true;
  }
  return false;
};

export const setOfferSelectionUrl = (url) => {
  if (url) {
    setData('CLEENG_OFFER_SELECTION_URL', url);
    return true;
  }
  return false;
};

export const setTermsUrl = (termsUrl) => {
  if (termsUrl) {
    setData('CLEENG_TERMS_URL', termsUrl);
    store.dispatch(initPublisherConfig({ termsUrl }));
    return true;
  }
  return false;
};

export const setResetUrl = (resetUrl) => {
  if (resetUrl) {
    store.dispatch(initPublisherConfig({ resetUrl }));
    return true;
  }
  return false;
};

export const setTheme = (theme) => {
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

export const setHidePayPal = () => {
  store.dispatch(
    initPublisherConfig({
      isPayPalHidden: true
    })
  );
  return true;
};

export const setHiddenPaymentMethods = (hiddenPaymentMethods) => {
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

export const setGoogleRecaptcha = (googleRecaptchaObject) => {
  store.dispatch(updateGoogleRecaptcha(googleRecaptchaObject));
  return true;
};

export const setLanguage = async (language, baseUrl) => {
  const BASE_URL = baseUrl ?? window.location.origin;

  if (!i18n.hasResourceBundle(language, 'translations')) {
    const data = await fetch(
      `${BASE_URL}/cleeng-translations/${language}/translations.json`
    )
      .then((response) => {
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

export const setDisablePaymentCheckbox = () => {
  store.dispatch(
    initPublisherConfig({
      isPaymentCheckboxDisabled: true
    })
  );
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
  setHiddenPaymentMethods,
  setLanguage,
  setEnable3DSRedirectFlow,
  setDisablePaymentCheckbox,
  setGoogleRecaptcha
};
