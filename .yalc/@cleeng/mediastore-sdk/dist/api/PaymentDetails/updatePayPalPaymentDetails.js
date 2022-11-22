"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fetchHelper = _interopRequireDefault(require("../../util/fetchHelper"));
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var _appConfigHelper = require("../../util/appConfigHelper");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var updatePayPalPaymentDetails = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(paymentMethodId) {
    var API_URL, url, redirectUrls, res;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_URL = (0, _environmentHelper.default)();
            url = "".concat(API_URL, "/connectors/paypal/v1/payment_details/tokens");
            redirectUrls = {
              successUrl: (0, _appConfigHelper.getData)('CLEENG_MYACCOUNT_PP_SUCCESS') ? "".concat((0, _appConfigHelper.getData)('CLEENG_MYACCOUNT_PP_SUCCESS')) : "".concat(window.location.origin, "/my-account/payment-info"),
              cancelUrl: (0, _appConfigHelper.getData)('CLEENG_MYACCOUNT_PP_CANCEL') || "".concat(window.location.origin, "/my-account/payment-info"),
              errorUrl: (0, _appConfigHelper.getData)('CLEENG_MYACCOUNT_PP_ERROR') || "".concat(window.location.origin, "/my-account/payment-info")
            };
            _context.prev = 3;
            _context.next = 6;
            return (0, _fetchHelper.default)(url, {
              method: 'POST',
              body: JSON.stringify(_objectSpread(_objectSpread({}, redirectUrls), {}, {
                paymentMethodId: paymentMethodId
              }))
            });
          case 6:
            res = _context.sent;
            return _context.abrupt("return", res.json());
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", _context.t0);
          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 10]]);
  }));
  return function updatePayPalPaymentDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = updatePayPalPaymentDetails;
exports.default = _default;