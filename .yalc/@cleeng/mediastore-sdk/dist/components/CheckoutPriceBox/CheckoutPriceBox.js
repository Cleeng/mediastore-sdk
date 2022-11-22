"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureCheckoutPriceBox = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _formatNumber = _interopRequireDefault(require("../../util/formatNumber"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _CheckoutPriceBoxStyled = require("./CheckoutPriceBoxStyled");
var CheckoutPriceBox = function CheckoutPriceBox(_ref) {
  var isCouponApplied = _ref.isCouponApplied,
    finalPrice = _ref.finalPrice,
    discountAmount = _ref.discountAmount,
    taxValue = _ref.taxValue,
    customerServiceFee = _ref.customerServiceFee,
    paymentMethodFee = _ref.paymentMethodFee,
    customerCurrencySymbol = _ref.customerCurrencySymbol,
    offerPrice = _ref.offerPrice,
    taxRate = _ref.taxRate,
    country = _ref.country,
    t = _ref.t;
  return /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceBox, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceBoxWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, t('Price')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, "".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(offerPrice), " "), /*#__PURE__*/_react.default.createElement("span", null, country === 'US' ? t('excl. Tax') : t('excl. VAT')))), isCouponApplied && /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, t('Coupon Discount')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, "- ", customerCurrencySymbol, (0, _formatNumber.default)(discountAmount))), (taxValue !== 0 || taxRate !== 0) && /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, country === 'US' ? t('Applicable Tax') : t('Applicable VAT')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, taxValue ? "".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(taxValue)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), !taxValue && taxRate && isCouponApplied && /*#__PURE__*/_react.default.createElement("p", {
    style: {
      textDecoration: 'line-through'
    }
  }, customerCurrencySymbol, " ", (0, _formatNumber.default)(taxRate * offerPrice)))), customerServiceFee !== 0 && /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, t('Service Fee')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, "".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(customerServiceFee)))), paymentMethodFee !== 0 && /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, t('Payment Method Fee')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, "".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(paymentMethodFee)))), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledTotalLabel, null, t('Total')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledTotalOfferPrice, null, "".concat(customerCurrencySymbol).concat((0, _formatNumber.default)(finalPrice))))));
};
exports.PureCheckoutPriceBox = CheckoutPriceBox;
CheckoutPriceBox.propTypes = {
  customerCurrencySymbol: _propTypes.default.string,
  offerPrice: _propTypes.default.number,
  discountAmount: _propTypes.default.number,
  taxValue: _propTypes.default.number,
  taxRate: _propTypes.default.number,
  customerServiceFee: _propTypes.default.number,
  paymentMethodFee: _propTypes.default.number,
  isCouponApplied: _propTypes.default.bool,
  finalPrice: _propTypes.default.number,
  country: _propTypes.default.string,
  t: _propTypes.default.func
};
CheckoutPriceBox.defaultProps = {
  customerCurrencySymbol: '',
  offerPrice: 0,
  discountAmount: 0,
  taxRate: 0,
  taxValue: 0,
  customerServiceFee: 0,
  paymentMethodFee: 0,
  isCouponApplied: false,
  finalPrice: 0,
  country: '',
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(CheckoutPriceBox));
exports.default = _default;