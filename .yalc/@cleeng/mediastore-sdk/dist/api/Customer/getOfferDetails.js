"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _fetchHelper = require("../../util/fetchHelper");
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var _getCustomer = _interopRequireDefault(require("./getCustomer"));
var getOfferDetails = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(offerId) {
    var API_URL, customerEmail, customerResponse, url;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            API_URL = (0, _environmentHelper.default)();
            customerEmail = (0, _appConfigHelper.getData)('CLEENG_CUSTOMER_EMAIL') || null;
            if (customerEmail) {
              _context.next = 7;
              break;
            }
            _context.next = 5;
            return (0, _getCustomer.default)();
          case 5:
            customerResponse = _context.sent;
            if (customerResponse.responseData) {
              customerEmail = customerResponse.responseData.email;
            }
          case 7:
            url = "".concat(API_URL, "/offers/").concat(offerId, "/customers/").concat(customerEmail);
            return _context.abrupt("return", (0, _fetchHelper.fetchWithHeaders)(url, {}).then(function (res) {
              return res.json();
            }));
          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getOfferDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = getOfferDetails;
exports.default = _default;