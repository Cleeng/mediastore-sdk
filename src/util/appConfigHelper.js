/* istanbul ignore file */

import store from 'redux/store';
import {
  setData as setDataInRedux,
  removeData as removeDataFromRedux
} from 'redux/appConfigReducer';

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

export const isHosted = () =>
  getData('CLEENG_HOSTED') && getData('CLEENG_HOSTED') === 'true';

// for hosted solution only
export const listenForPayPalUrls = () => {
  window.addEventListener('message', event => {
    if (!event.data) return;
    if (event.origin !== 'http://127.0.0.1:5500') return;
    // console.log('I GET MESSGAE', event);
    const { paypalSuccess, paypalCancel, paypalError } = event.data;
    setData('CLEENG_PP_SUCCESS', paypalSuccess);
    setData('CLEENG_PP_CANCEL', paypalCancel);
    setData('CLEENG_PP_ERROR', paypalError);
  });
};
