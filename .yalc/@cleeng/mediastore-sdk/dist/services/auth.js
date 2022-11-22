"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _jwtDecode2 = _interopRequireDefault(require("jwt-decode"));
var _appConfigHelper = require("../util/appConfigHelper");
var _getCaptureStatus = _interopRequireDefault(require("../api/Customer/getCaptureStatus"));
var _getCustomerConsents = _interopRequireDefault(require("../api/Customer/getCustomerConsents"));
var _store = _interopRequireDefault(require("../redux/store"));
var _toolkit = require("@reduxjs/toolkit");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Auth = /*#__PURE__*/function () {
  function Auth() {
    (0, _classCallCheck2.default)(this, Auth);
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
  (0, _createClass2.default)(Auth, [{
    key: "login",
    value: function login() {
      var _this = this;
      var isMyAccount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var isRegister = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var email = arguments.length > 2 ? arguments[2] : undefined;
      var jwt = arguments.length > 3 ? arguments[3] : undefined;
      var refreshToken = arguments.length > 4 ? arguments[4] : undefined;
      var cb = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};
      var args = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
      var callback = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : function () {};
      this.isAuthenticated = true;
      var _jwtDecode = (0, _jwtDecode2.default)(jwt),
        customerId = _jwtDecode.customerId;
      (0, _appConfigHelper.setData)('CLEENG_CUSTOMER_ID', customerId);
      (0, _appConfigHelper.setData)('CLEENG_AUTH_TOKEN', jwt);
      (0, _appConfigHelper.setData)('CLEENG_REFRESH_TOKEN', refreshToken);
      (0, _appConfigHelper.setData)('CLEENG_CUSTOMER_EMAIL', email);
      if (cb) cb.apply(this, args);
      var redirectUrl = isMyAccount ? this.myAccount.mainPage : this.checkout.mainPage;
      var shouldConsentsBeDisplayed = false;
      var shouldCaptureBeDisplayed = false;
      var data = {};
      var consentsResponse = (0, _getCustomerConsents.default)().then(function (resp) {
        var consents = resp.responseData.consents;
        shouldConsentsBeDisplayed = isRegister ? false : consents.some(function (consent) {
          return consent.newestVersion > consent.version || consent.needsUpdate === true;
        });
      });
      var captureResponse = (0, _getCaptureStatus.default)().then(function (resp) {
        if (resp.responseData.shouldCaptureBeDisplayed === true) {
          shouldCaptureBeDisplayed = true;
          data = _objectSpread(_objectSpread({}, data), {}, {
            settings: resp.responseData.settings
          });
        }
      });
      Promise.allSettled([consentsResponse, captureResponse]).then(function () {
        data = _objectSpread(_objectSpread({}, data), {}, {
          redirectUrl: [shouldCaptureBeDisplayed ? _this.capturePage : null, shouldConsentsBeDisplayed ? _this.consentsPage : null, redirectUrl].filter(Boolean)
        });
      });
      callback();
    }
  }, {
    key: "logout",
    value: function logout() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.isAuthenticated = false;
      (0, _appConfigHelper.removeData)('CLEENG_AUTH_TOKEN');
      (0, _appConfigHelper.removeData)('CLEENG_REFRESH_TOKEN');
      (0, _appConfigHelper.removeData)('CLEENG_ORDER_ID');
      (0, _appConfigHelper.removeData)('CLEENG_CHECKOUT_PP_SUCCESS');
      (0, _appConfigHelper.removeData)('CLEENG_CHECKOUT_PP_CANCEL');
      (0, _appConfigHelper.removeData)('CLEENG_CHECKOUT_PP_ERROR');
      (0, _appConfigHelper.removeData)('CLEENG_MYACCOUNT_PP_SUCCESS');
      (0, _appConfigHelper.removeData)('CLEENG_MYACCOUNT_PP_CANCEL');
      (0, _appConfigHelper.removeData)('CLEENG_MYACCOUNT_PP_ERROR');
      _store.default.dispatch((0, _toolkit.createAction)('USER_LOGOUT')());
      callback();
    }
  }, {
    key: "isLogged",
    value: function isLogged() {
      var jwt = (0, _appConfigHelper.getData)('CLEENG_AUTH_TOKEN');
      var refreshToken = (0, _appConfigHelper.getData)('CLEENG_REFRESH_TOKEN');
      if (!jwt) {
        this.isAuthenticated = !!refreshToken;
        return this.isAuthenticated;
      }
      var decoded = (0, _jwtDecode2.default)(jwt);
      var now = Date.now() / 1000;
      var isExpired = now > decoded.exp;
      if (isExpired && !refreshToken) {
        this.logout();
      } else {
        this.isAuthenticated = true;
      }
      return this.isAuthenticated;
    }
  }]);
  return Auth;
}();
var _default = new Auth();
exports.default = _default;