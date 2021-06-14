"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureCheckoutPriceBox = void 0;

var _react = _interopRequireDefault(require("react"));

var _roundNumber = _interopRequireDefault(require("util/roundNumber"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

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
      t = _ref.t;
  return /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceBox, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceBoxWrapper, null, isCouponApplied && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, t('Price'), ":"), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, "".concat(customerCurrencySymbol).concat(offerPrice, " "), /*#__PURE__*/_react.default.createElement("span", null, t('exVAT')))), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, t('Coupon Discount')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, "".concat(customerCurrencySymbol).concat(discountAmount)))), taxValue !== 0 && /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, t('Applicable Tax')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, "".concat(customerCurrencySymbol).concat(taxValue))), customerServiceFee !== 0 && /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, t('Service Fee')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, "".concat(customerCurrencySymbol).concat((0, _roundNumber.default)(customerServiceFee)))), paymentMethodFee !== 0 && /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledLabel, null, t('Payment Method Fee')), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledOfferPrice, null, "".concat(customerCurrencySymbol).concat((0, _roundNumber.default)(paymentMethodFee)))), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledPriceWrapper, null, /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledTotalLabel, null, t('Total'), ":"), /*#__PURE__*/_react.default.createElement(_CheckoutPriceBoxStyled.StyledTotalOfferPrice, null, "".concat(customerCurrencySymbol).concat((0, _roundNumber.default)(finalPrice))))));
};

exports.PureCheckoutPriceBox = CheckoutPriceBox;
CheckoutPriceBox.defaultProps = {
  customerCurrencySymbol: '',
  offerPrice: 0,
  discountAmount: 0,
  taxValue: 0,
  customerServiceFee: 0,
  paymentMethodFee: 0,
  isCouponApplied: false,
  finalPrice: 0,
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(CheckoutPriceBox));

exports.default = _default;