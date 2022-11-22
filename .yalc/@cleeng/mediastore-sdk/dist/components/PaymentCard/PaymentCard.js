"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _SkeletonWrapper = _interopRequireDefault(require("../SkeletonWrapper"));
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _Payment = require("./Payment.const");
var _PaymentCardStyled = require("./PaymentCardStyled");
var INAPPS = ['android', 'apple', 'amazon', 'roku'];
var PaymentCard = function PaymentCard(_ref) {
  var isDataLoaded = _ref.isDataLoaded,
    details = _ref.details,
    showInnerPopup = _ref.showInnerPopup;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t;
  var paymentMethodSpecificParams = details.paymentMethodSpecificParams,
    paymentMethod = details.paymentMethod;
  var LogoComponent = paymentMethodSpecificParams && _Payment.CardTypesIcons[paymentMethodSpecificParams.variant] ? _Payment.CardTypesIcons[paymentMethodSpecificParams.variant] : _Payment.CardTypesIcons[details.paymentMethod] || null;
  return /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardWrapStyled, {
    type: details.paymentMethod
  }, isDataLoaded ? /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardStyled, null, LogoComponent && /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardTypeStyled, null, /*#__PURE__*/_react.default.createElement(LogoComponent, null)), (paymentMethodSpecificParams === null || paymentMethodSpecificParams === void 0 ? void 0 : paymentMethodSpecificParams.lastCardFourDigits) && /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardNumberStyled, null, "**** **** **** ", paymentMethodSpecificParams.lastCardFourDigits), INAPPS.includes(paymentMethod) && /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardNumberStyled, null, t('Billing via'), ' ', /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.MethodNameStyled, null, paymentMethod)), (paymentMethodSpecificParams === null || paymentMethodSpecificParams === void 0 ? void 0 : paymentMethodSpecificParams.cardExpirationDate) && /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardExpirationStyled, null, /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardExpirationLabel, null, t('Expiry date')), /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardExpirationDateStyled, null, paymentMethodSpecificParams.cardExpirationDate)), (paymentMethodSpecificParams === null || paymentMethodSpecificParams === void 0 ? void 0 : paymentMethodSpecificParams.holderName) && !(paymentMethodSpecificParams !== null && paymentMethodSpecificParams !== void 0 && paymentMethodSpecificParams.cardExpirationDate) && /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardExpirationStyled, null, /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardExpirationLabel, null, t('Holder name')), /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardExpirationDateStyled, null, paymentMethodSpecificParams.holderName)), /*#__PURE__*/_react.default.createElement(_PaymentCardStyled.CardEditStyled, {
    onClick: function onClick() {
      showInnerPopup({
        type: _innerPopupReducer.POPUP_TYPES.paymentDetails,
        data: details
      });
      window.dispatchEvent(new CustomEvent('MSSDK:edit-payment-button-clicked', {
        detail: {
          paymentMethod: paymentMethod
        }
      }));
    }
  }, t('Edit payment info'))) : /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    height: 166
  }));
};
PaymentCard.propTypes = {
  showInnerPopup: _propTypes.default.func,
  details: _propTypes.default.objectOf(_propTypes.default.any),
  isDataLoaded: _propTypes.default.bool
};
PaymentCard.defaultProps = {
  showInnerPopup: function showInnerPopup() {},
  details: {},
  isDataLoaded: true
};
var _default = PaymentCard;
exports.default = _default;