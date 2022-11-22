"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _fetchHelper = require("../../util/fetchHelper");
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var registerCustomer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(email, password, publisherId, locale, country, currency) {
    var url, resp, json;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "".concat((0, _environmentHelper.default)(), "/customers");
            _context.prev = 1;
            _context.next = 4;
            return (0, _fetchHelper.fetchWithHeaders)(url, {
              method: 'POST',
              body: JSON.stringify({
                email: email,
                password: password,
                publisherId: publisherId,
                locale: locale,
                country: country,
                currency: currency
              })
            });
          case 4:
            resp = _context.sent;
            _context.next = 7;
            return resp.json();
          case 7:
            json = _context.sent;
            (0, _appConfigHelper.sendMessage)(_objectSpread({}, json.responseData));
            return _context.abrupt("return", _objectSpread({
              status: resp.status
            }, json));
          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);
          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));
  return function registerCustomer(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
var _default = registerCustomer;
exports.default = _default;