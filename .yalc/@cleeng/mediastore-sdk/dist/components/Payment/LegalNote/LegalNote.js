"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _PaymentStyled = require("../PaymentStyled");
var _util = require("../../../util");
// TODO: check barel? file

var LegalNote = function LegalNote(_ref) {
  var _ref$order = _ref.order,
    discount = _ref$order.discount,
    currency = _ref$order.currency,
    offerPrice = _ref$order.priceBreakdown.offerPrice,
    period = _ref.period;
  var discountApplied = discount === null || discount === void 0 ? void 0 : discount.applied;
  var isInTrial = (discount === null || discount === void 0 ? void 0 : discount.type) === 'trial';
  var readablePrice = "".concat(_util.currencyFormat[currency]).concat(offerPrice).concat(period ? "/".concat(period) : '');
  var CLEENG_MY_ACCOUNT_URL = 'CLEENG_MY_ACCOUNT_URL';
  return /*#__PURE__*/_react.default.createElement(_PaymentStyled.LegalNoteWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_PaymentStyled.LegalTextStyled, null, /*#__PURE__*/_react.default.createElement("strong", null, discountApplied ? 'After any free trial and/or promotional period' : "By clicking 'Complete purchase'", ", you will be charged ", readablePrice, " or the then-current price plus applicable taxes on a recurring basis.", ' '), isInTrial && 'If you do not cancel the service during its free trial period, you will be charged. ', "Your subscription will automatically continue until you cancel. To cancel, log into", ' ', /*#__PURE__*/_react.default.createElement("a", {
    href: (0, _util.getData)(CLEENG_MY_ACCOUNT_URL),
    style: {
      textDecoration: (0, _util.getData)(CLEENG_MY_ACCOUNT_URL) ? 'underline' : 'none'
    }
  }, "your account"), "and click 'Manage Subscription'."), /*#__PURE__*/_react.default.createElement(_PaymentStyled.LegalTextStyled, null, "By clicking 'Complete Purchase' above, I expressly acknowledge and agree to the above terms as well as the full Terms of Service."));
};
LegalNote.propTypes = {
  order: _propTypes.default.objectOf(_propTypes.default.any),
  period: _propTypes.default.string
};
LegalNote.defaultProps = {
  order: {},
  period: null
};
var _default = LegalNote;
exports.default = _default;