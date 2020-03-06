import jwtDecode from 'jwt-decode';
import history from '../history';

class Auth {
  constructor() {
    this.isAuthenticated = false;
  }

  login(email, jwt, cb = () => {}, args = []) {
    this.isAuthenticated = true;
    localStorage.setItem('CLEENG_AUTH_TOKEN', jwt);
    localStorage.setItem('CLEENG_CUSTOMER_EMAIL', email);
    cb.apply(this, args);
    history.push('/offer');
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('CLEENG_AUTH_TOKEN');
    localStorage.removeItem('CLEENG_ORDER_ID');
    history.push('/login');
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
