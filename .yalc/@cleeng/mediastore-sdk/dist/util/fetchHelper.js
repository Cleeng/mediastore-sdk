"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchWithHeaders = exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _lodash = _interopRequireDefault(require("lodash.merge"));
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _appConfigHelper = require("./appConfigHelper");
var _auth = _interopRequireDefault(require("../services/auth"));
var _environmentHelper = _interopRequireDefault(require("./environmentHelper"));
var JWT = 'CLEENG_AUTH_TOKEN';
var REFRESH_TOKEN = 'CLEENG_REFRESH_TOKEN';
var retrieveJWT = function retrieveJWT() {
  return (0, _appConfigHelper.getData)(JWT);
};
var retrieveRefreshToken = function retrieveRefreshToken() {
  return (0, _appConfigHelper.getData)(REFRESH_TOKEN);
};
var IS_FETCHING_REFRESH_TOKEN = false;
var REFRESH_TOKEN_ERROR = false;
var isJWTExpired = function isJWTExpired() {
  var jwt = retrieveJWT();
  if (jwt) {
    var decoded = (0, _jwtDecode.default)(jwt);
    return Date.now() / 1000 > decoded.exp;
  }
  return true;
};
var fetchNewTokens = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var API_URL, response, responseJSON;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_URL = (0, _environmentHelper.default)();
            IS_FETCHING_REFRESH_TOKEN = true;
            _context.next = 4;
            return fetch("".concat(API_URL, "/auths/refresh_token"), {
              method: 'POST',
              body: JSON.stringify({
                refreshToken: (0, _appConfigHelper.getData)('CLEENG_REFRESH_TOKEN')
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            });
          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();
          case 7:
            responseJSON = _context.sent;
            (0, _appConfigHelper.setData)(JWT, responseJSON.responseData.jwt);
            (0, _appConfigHelper.setData)(REFRESH_TOKEN, responseJSON.responseData.refreshToken);
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function fetchNewTokens() {
    return _ref.apply(this, arguments);
  };
}();
var generatePromiseWithHeaders = function generatePromiseWithHeaders(url, options) {
  var token = retrieveJWT();
  var optionsWithToken = options;
  if (token != null) {
    optionsWithToken = (0, _lodash.default)({}, options, {
      headers: {
        Authorization: "Bearer ".concat(token),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }
  return window.fetch(url, optionsWithToken);
};
var fetchWithJWT = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(url) {
    var options,
      isExpired,
      refreshToken,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            isExpired = isJWTExpired();
            refreshToken = retrieveRefreshToken();
            if (isExpired && !refreshToken) {
              _auth.default.logout();
            }
            if (!(isExpired && refreshToken)) {
              _context2.next = 11;
              break;
            }
            if (IS_FETCHING_REFRESH_TOKEN) {
              _context2.next = 10;
              break;
            }
            _context2.next = 8;
            return fetchNewTokens().then(function () {
              IS_FETCHING_REFRESH_TOKEN = false;
            }).catch(function () {
              IS_FETCHING_REFRESH_TOKEN = false;
              REFRESH_TOKEN_ERROR = true;
              _auth.default.logout();
              return new Promise(function (resolve, reject) {
                return reject();
              });
            });
          case 8:
            _context2.next = 11;
            break;
          case 10:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var isRefreshTokenFetched = function isRefreshTokenFetched() {
                if (REFRESH_TOKEN_ERROR) {
                  reject();
                  return;
                }
                if (!IS_FETCHING_REFRESH_TOKEN) {
                  resolve(generatePromiseWithHeaders(url, options));
                  return;
                }
                setTimeout(function () {
                  isRefreshTokenFetched();
                }, 500);
              };
              isRefreshTokenFetched();
            }));
          case 11:
            return _context2.abrupt("return", generatePromiseWithHeaders(url, options));
          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function fetchWithJWT(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var fetchWithHeaders = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(url) {
    var options,
      optionsWithToken,
      _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            optionsWithToken = options;
            optionsWithToken = (0, _lodash.default)({}, options, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            });
            return _context3.abrupt("return", window.fetch(url, optionsWithToken));
          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function fetchWithHeaders(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
exports.fetchWithHeaders = fetchWithHeaders;
var _default = fetchWithJWT;
exports.default = _default;