"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fetchHelper = require("../../util/fetchHelper");
var _appConfigHelper = require("../../util/appConfigHelper");
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var loginCustomer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(email, password, loginBy) {
    var API_URL, url, resp, json;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_URL = (0, _environmentHelper.default)();
            url = "".concat(API_URL, "/auths");
            _context.prev = 2;
            _context.next = 5;
            return (0, _fetchHelper.fetchWithHeaders)(url, {
              method: 'POST',
              body: JSON.stringify(_objectSpread({
                email: email,
                password: password
              }, loginBy))
            });
          case 5:
            resp = _context.sent;
            _context.next = 8;
            return resp.json();
          case 8:
            json = _context.sent;
            (0, _appConfigHelper.sendMessage)(_objectSpread({}, json.responseData));
            return _context.abrupt("return", _objectSpread({
              status: resp.status
            }, json));
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", _context.t0);
          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 13]]);
  }));
  return function loginCustomer(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = loginCustomer;
exports.default = _default;