"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTheme = exports.setRefreshToken = exports.setPublisher = exports.setOfferSelectionUrl = exports.setOffer = exports.setMyAccountUrl = exports.setMyAccountPayPalUrls = exports.setJWT = exports.setEnvironment = exports.setData = exports.setCheckoutPayPalUrls = exports.sendMessage = exports.removeData = exports.getTheme = exports.getData = exports.default = void 0;
var _store = _interopRequireDefault(require("../redux/store"));
var _appConfig = require("../redux/appConfig");
/* istanbul ignore file */

var isLocalStorageAvailable = function isLocalStorageAvailable() {
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
var getData = function getData(name) {
  var result = isLocalStorageAvailable() ? localStorage.getItem(name) : _store.default.getState().appConfig[name];
  if (!result && name === 'CLEENG_AUTH_TOKEN') {
    console.error("Unable to get CLEENG_AUTH_TOKEN from local storage or redux store");
    return null;
  }
  return result;
};
exports.getData = getData;
var setData = function setData(name, value) {
  return isLocalStorageAvailable() ? localStorage.setItem(name, value) : _store.default.dispatch((0, _appConfig.setData)({
    name: name,
    value: value
  }));
};
exports.setData = setData;
var removeData = function removeData(name) {
  return isLocalStorageAvailable() ? localStorage.removeItem(name) : _store.default.dispatch((0, _appConfig.removeData)({
    name: name
  }));
};
exports.removeData = removeData;
var sendMessage = function sendMessage(msg) {
  if (window.opener) {
    window.opener.postMessage(msg, '*');
  } else if (window.top) {
    window.top.postMessage(msg, '*');
  }
};
exports.sendMessage = sendMessage;
var setJWT = function setJWT(jwt) {
  if (jwt) {
    setData('CLEENG_AUTH_TOKEN', jwt);
    return true;
  }
  return false;
};
exports.setJWT = setJWT;
var setRefreshToken = function setRefreshToken(refreshToken) {
  if (refreshToken) {
    setData('CLEENG_REFRESH_TOKEN', refreshToken);
    return true;
  }
  return false;
};
exports.setRefreshToken = setRefreshToken;
var setPublisher = function setPublisher(publisherId) {
  if (publisherId) {
    setData('CLEENG_PUBLISHER_ID', publisherId);
    return true;
  }
  return false;
};
exports.setPublisher = setPublisher;
var setOffer = function setOffer(offerId) {
  if (offerId) {
    setData('CLEENG_OFFER_ID', offerId);
    return true;
  }
  return false;
};
exports.setOffer = setOffer;
var setEnvironment = function setEnvironment(env) {
  if (env) {
    setData('CLEENG_ENVIRONMENT', env);
    return true;
  }
  return false;
};
exports.setEnvironment = setEnvironment;
var setCheckoutPayPalUrls = function setCheckoutPayPalUrls(urls) {
  if (urls) {
    var successUrl = urls.successUrl,
      cancelUrl = urls.cancelUrl,
      errorUrl = urls.errorUrl;
    setData('CLEENG_CHECKOUT_PP_SUCCESS', successUrl);
    setData('CLEENG_CHECKOUT_PP_CANCEL', cancelUrl);
    setData('CLEENG_CHECKOUT_PP_ERROR', errorUrl);
    return true;
  }
  return false;
};
exports.setCheckoutPayPalUrls = setCheckoutPayPalUrls;
var setMyAccountPayPalUrls = function setMyAccountPayPalUrls(urls) {
  if (urls) {
    var successUrl = urls.successUrl,
      cancelUrl = urls.cancelUrl,
      errorUrl = urls.errorUrl;
    setData('CLEENG_MYACCOUNT_PP_SUCCESS', successUrl);
    setData('CLEENG_MYACCOUNT_PP_CANCEL', cancelUrl);
    setData('CLEENG_MYACCOUNT_PP_ERROR', errorUrl);
    return true;
  }
  return false;
};
exports.setMyAccountPayPalUrls = setMyAccountPayPalUrls;
var setMyAccountUrl = function setMyAccountUrl(url) {
  if (url) {
    setData('CLEENG_MY_ACCOUNT_URL', url);
    return true;
  }
  return false;
};
exports.setMyAccountUrl = setMyAccountUrl;
var setOfferSelectionUrl = function setOfferSelectionUrl(url) {
  if (url) {
    setData('CLEENG_OFFER_SELECTION_URL', url);
    return true;
  }
  return false;
};
exports.setOfferSelectionUrl = setOfferSelectionUrl;
var setTheme = function setTheme(theme) {
  var themeString = JSON.stringify(theme);
  if (theme) {
    setData('CLEENG_THEME', themeString);
    return true;
  }
  return false;
};
exports.setTheme = setTheme;
var getTheme = function getTheme() {
  var theme = getData('CLEENG_THEME');
  if (theme) {
    var themeJSON = JSON.parse(theme);
    return themeJSON;
  }
  return false;
};
exports.getTheme = getTheme;
var _default = {
  setPublisher: setPublisher,
  setOffer: setOffer,
  setEnvironment: setEnvironment,
  setTheme: setTheme,
  setCheckoutPayPalUrls: setCheckoutPayPalUrls,
  setMyAccountPayPalUrls: setMyAccountPayPalUrls,
  setMyAccountUrl: setMyAccountUrl,
  setOfferSelectionUrl: setOfferSelectionUrl,
  setJWT: setJWT,
  setRefreshToken: setRefreshToken
};
exports.default = _default;