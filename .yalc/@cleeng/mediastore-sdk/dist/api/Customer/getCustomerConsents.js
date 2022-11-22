"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _fetchHelper = _interopRequireDefault(require("../../util/fetchHelper"));
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var _jwtDecode2 = _interopRequireDefault(require("jwt-decode"));
var getCustomerConsents = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var API_URL, _jwtDecode, customerId, url;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_URL = (0, _environmentHelper.default)();
            _jwtDecode = (0, _jwtDecode2.default)((0, _appConfigHelper.getData)('CLEENG_AUTH_TOKEN')), customerId = _jwtDecode.customerId;
            url = "".concat(API_URL, "/customers/").concat(customerId, "/consents");
            return _context.abrupt("return", (0, _fetchHelper.default)(url, {
              method: 'GET'
            }).then(function (res) {
              return res.json();
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getCustomerConsents() {
    return _ref.apply(this, arguments);
  };
}();
var _default = getCustomerConsents;
exports.default = _default;