"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PurePaymentMethod = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _MyAccountError = _interopRequireDefault(require("components/MyAccountError"));

var _SkeletonWrapper = _interopRequireDefault(require("components/SkeletonWrapper"));

var _PaymentMethod = require("./PaymentMethod.const");

var _PaymentMethodStyled = require("./PaymentMethodStyled");

/* eslint-disable no-nested-ternary */
var PaymentCard = function PaymentCard(_ref) {
  var lastCardFourDigits = _ref.lastCardFourDigits,
      cardExpirationDate = _ref.cardExpirationDate,
      variant = _ref.variant,
      isDataLoaded = _ref.isDataLoaded,
      t = _ref.t;
  var LogoComponent = _PaymentMethod.CardTypesIcons[variant] ? _PaymentMethod.CardTypesIcons[variant] : _react.default.Fragment;
  return /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardWrapStyled, null, isDataLoaded ? /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardStyled, null, /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardTypeStyled, null, /*#__PURE__*/_react.default.createElement(LogoComponent, null)), /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardNumberStyled, null, "**** **** **** ", lastCardFourDigits), /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardExpirationStyled, null, /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardExpirationLabel, null, t('Expiry date')), /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardExpirationDateStyled, null, cardExpirationDate))) : /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    height: 166
  }));
};

PaymentCard.defaultProps = {
  lastCardFourDigits: '',
  cardExpirationDate: '',
  isDataLoaded: true,
  variant: '',
  t: function t(k) {
    return k;
  }
};

var PaymentMethod = function PaymentMethod(_ref2) {
  var paymentDetailsLoading = _ref2.paymentDetailsLoading,
      paymentDetails = _ref2.paymentDetails,
      error = _ref2.error,
      t = _ref2.t;
  return paymentDetailsLoading ? /*#__PURE__*/_react.default.createElement(PaymentCard, {
    isDataLoaded: false
  }) : /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.WrapStyled, null, error.length !== 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
    generalError: true,
    fullHeight: true
  }) : paymentDetails.length === 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
    title: t('No payment method added!'),
    subtitle: t('Add a card to start your plan'),
    withBorder: true
  }) : /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.PaymentDetailsStyled, null, paymentDetails.map(function (method) {
    if (method.paymentMethod === 'card') {
      var _method$paymentMethod = method.paymentMethodSpecificParams,
          lastCardFourDigits = _method$paymentMethod.lastCardFourDigits,
          cardExpirationDate = _method$paymentMethod.cardExpirationDate,
          variant = _method$paymentMethod.variant;
      return /*#__PURE__*/_react.default.createElement(PaymentCard, {
        key: method.id,
        lastCardFourDigits: lastCardFourDigits,
        cardExpirationDate: cardExpirationDate,
        variant: variant
      });
    }

    if (method.paymentMethod === 'paypal') {
      var LogoComponent = _PaymentMethod.CardTypesIcons[method.paymentMethod] ? _PaymentMethod.CardTypesIcons[method.paymentMethod] : _react.default.Fragment;
      return /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardWrapStyled, {
        key: method.id,
        type: method.paymentMethod
      }, /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardStyled, null, /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardTypeStyled, null, /*#__PURE__*/_react.default.createElement(LogoComponent, null))));
    }

    return /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.Message, {
      key: "message"
    }, t('Payment by '), " ", method.paymentMethod, ' ', t('is not supported'));
  })));
};

exports.PurePaymentMethod = PaymentMethod;
PaymentMethod.defaultProps = {
  paymentDetails: [],
  error: [],
  paymentDetailsLoading: false,
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(PaymentMethod));

exports.default = _default;