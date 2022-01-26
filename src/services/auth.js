/* eslint-disable no-unused-vars */
import jwtDecode from 'jwt-decode';
import { getData, setData, removeData } from 'util/appConfigHelper';
import getCaptureStatus from 'api/Customer/getCaptureStatus';
import getCustomerConsents from 'api/Customer/getCustomerConsents';

class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.myAccount = {
      mainPage: '/my-account/plan-details',
      loginPage: '/my-account/login'
    };
    this.checkout = {
      mainPage: '/offer',
      loginPage: '/login'
    };
    this.capturePage = '/capture';
    this.consentsPage = '/consents';
  }

  login(
    isMyAccount = false,
    isRegister = false,
    email,
    jwt,
    refreshToken,
    cb = () => {},
    args = [],
    callback = () => {}
  ) {
    this.isAuthenticated = true;
    const { customerId } = jwtDecode(jwt);
    setData('CLEENG_CUSTOMER_ID', customerId);
    setData('CLEENG_AUTH_TOKEN', jwt);
    setData('CLEENG_REFRESH_TOKEN', refreshToken);
    setData('CLEENG_CUSTOMER_EMAIL', email);
    if (cb) cb.apply(this, args);
    const redirectUrl = isMyAccount
      ? this.myAccount.mainPage
      : this.checkout.mainPage;

    let shouldConsentsBeDisplayed = false;
    let shouldCaptureBeDisplayed = false;
    let data = {};

    const consentsResponse = getCustomerConsents().then(resp => {
      const { consents } = resp.responseData;
      shouldConsentsBeDisplayed = isRegister
        ? false
        : consents.some(
            consent =>
              consent.newestVersion > consent.version ||
              consent.needsUpdate === true
          );
    });

    const captureResponse = getCaptureStatus().then(resp => {
      if (resp.responseData.shouldCaptureBeDisplayed === true) {
        shouldCaptureBeDisplayed = true;
        data = {
          ...data,
          settings: resp.responseData.settings
        };
      }
    });

    Promise.allSettled([consentsResponse, captureResponse]).then(() => {
      data = {
        ...data,
        redirectUrl: [
          shouldCaptureBeDisplayed ? this.capturePage : null,
          shouldConsentsBeDisplayed ? this.consentsPage : null,
          redirectUrl
        ].filter(Boolean)
      };
    });

    callback();
  }

  logout(isMyAccount = false, queryParam = '', callback = () => {}) {
    this.isAuthenticated = false;
    removeData('CLEENG_AUTH_TOKEN');
    removeData('CLEENG_REFRESH_TOKEN');
    removeData('CLEENG_ORDER_ID');
    removeData('CLEENG_PP_SUCCESS');
    removeData('CLEENG_PP_CANCEL');
    removeData('CLEENG_PP_ERROR');

    callback();
  }

  isLogged() {
    const jwt = getData('CLEENG_AUTH_TOKEN');
    const refreshToken = getData('CLEENG_REFRESH_TOKEN');

    if (!jwt) {
      this.isAuthenticated = !!refreshToken;
      return this.isAuthenticated;
    }

    const decoded = jwtDecode(jwt);
    const now = Date.now() / 1000;
    const isExpired = now > decoded.exp;

    if (isExpired && !refreshToken) {
      this.logout();
    } else {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
}

export default new Auth();
