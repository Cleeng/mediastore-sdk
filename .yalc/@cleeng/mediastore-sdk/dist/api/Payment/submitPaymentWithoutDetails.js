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
var submitPaymentWithoutDetails = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var API_URL, orderId, url, res;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_URL = (0, _environmentHelper.default)();
            orderId = parseInt((0, _appConfigHelper.getData)('CLEENG_ORDER_ID') || '0', 10);
            url = "".concat(API_URL, "/payments");
            _context.prev = 3;
            _context.next = 6;
            return (0, _fetchHelper.default)(url, {
              method: 'POST',
              body: JSON.stringify({
                orderId: orderId
              })
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
  return function submitPaymentWithoutDetails() {
    return _ref.apply(this, arguments);
  };
}();
var _default = submitPaymentWithoutDetails;
exports.default = _default;