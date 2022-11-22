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
var deletePaymentDetails = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(paymentDetailsId) {
    var API_URL, url, res;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_URL = (0, _environmentHelper.default)();
            url = "".concat(API_URL, "/payment_details/").concat(paymentDetailsId);
            _context.next = 4;
            return (0, _fetchHelper.default)(url, {
              method: 'DELETE'
            });
          case 4:
            res = _context.sent;
            return _context.abrupt("return", res.json());
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function deletePaymentDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = deletePaymentDetails;
exports.default = _default;