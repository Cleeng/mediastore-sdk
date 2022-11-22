"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _fetchHelper = _interopRequireDefault(require("../../util/fetchHelper"));
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var updateAdyenPaymentDetails = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(paymentMethodId, card) {
    var API_URL, url, res;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_URL = (0, _environmentHelper.default)();
            url = "".concat(API_URL, "/connectors/adyen/payment_details");
            _context.prev = 2;
            _context.next = 5;
            return (0, _fetchHelper.default)(url, {
              method: 'POST',
              body: JSON.stringify({
                card: card,
                paymentMethodId: paymentMethodId
              })
            });
          case 5:
            res = _context.sent;
            return _context.abrupt("return", res.json());
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", _context.t0);
          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));
  return function updateAdyenPaymentDetails(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = updateAdyenPaymentDetails;
exports.default = _default;