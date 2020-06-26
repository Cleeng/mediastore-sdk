import jwtDecode from 'jwt-decode';
import history from '../history';

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
  }

  login(isMyAccount = false, email, jwt, cb = () => {}, args = []) {
    this.isAuthenticated = true;
    localStorage.setItem('CLEENG_AUTH_TOKEN', jwt);
    localStorage.setItem('CLEENG_CUSTOMER_EMAIL', email);
    cb.apply(this, args);
    const redirectURL = isMyAccount
      ? this.myAccount.mainPage
      : this.checkout.mainPage;
    history.push(redirectURL);
  }

  logout(isMyAccount = false, queryParam = '') {
    this.isAuthenticated = false;
    localStorage.removeItem('CLEENG_AUTH_TOKEN');
    localStorage.removeItem('CLEENG_ORDER_ID');
    history.push(
      isMyAccount
        ? this.myAccount.loginPage + queryParam
        : this.checkout.loginPage
    );
  }

  isLogged() {
    const jwt = localStorage.getItem('CLEENG_AUTH_TOKEN');
    if (!jwt) {
      this.isAuthenticated = false;
      return this.isAuthenticated;
    }

    const decoded = jwtDecode(jwt);
    const now = Date.now() / 1000;
    const isExpired = now > decoded.exp;
    if (isExpired) {
      this.logout();
    } else {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
}

export default new Auth();
