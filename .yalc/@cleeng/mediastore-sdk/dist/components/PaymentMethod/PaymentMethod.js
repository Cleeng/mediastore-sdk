"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _MyAccountError = _interopRequireDefault(require("../MyAccountError"));
var _PaymentCard = _interopRequireDefault(require("../PaymentCard"));
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _PaymentMethodStyled = require("./PaymentMethodStyled");
/* eslint-disable no-nested-ternary */
var AddIcon = function AddIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("circle", {
    stroke: "#5db98f",
    fill: "#5db98f",
    cx: "19",
    cy: "19",
    r: "18"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fill: "none",
    strokeWidth: "2",
    stroke: "#f0f3fa",
    d: "M19 8.237v21.526M28.763 19H9.237"
  }));
};
AddIcon.defaultProps = {
  width: "38",
  height: "38",
  xmlns: "http://www.w3.org/2000/svg",
  color: "red"
};
var PaymentMethod = function PaymentMethod(_ref) {
  var paymentDetailsLoading = _ref.paymentDetailsLoading,
    activeOrBoundPaymentDetails = _ref.activeOrBoundPaymentDetails,
    showInnerPopup = _ref.showInnerPopup,
    error = _ref.error;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t;
  var renderPaymentMethodItem = function renderPaymentMethodItem(paymentDetail) {
    var paymentMethod = paymentDetail.paymentMethod,
      id = paymentDetail.id;
    switch (paymentMethod) {
      case 'card':
      case 'paypal':
      case 'apple':
      case 'android':
      case 'amazon':
      case 'roku':
        return /*#__PURE__*/_react.default.createElement(_PaymentCard.default, {
          key: id,
          details: paymentDetail,
          showInnerPopup: showInnerPopup
        });
      default:
        return /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.Message, null, t('Managed by external service'));
    }
  };
  var activeItems = activeOrBoundPaymentDetails.find(function (item) {
    return item.active;
  });
  return paymentDetailsLoading ? /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardsWrapper, {
    numberOfItems: 1
  }, /*#__PURE__*/_react.default.createElement(_PaymentCard.default, {
    isDataLoaded: false
  })) : /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.WrapStyled, null, error.length !== 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
    generalError: true
  }) : /*#__PURE__*/_react.default.createElement(_PaymentMethodStyled.CardsWrapper, {
    numberOfItems: !activeItems ? activeOrBoundPaymentDetails.length + 1 : activeOrBoundPaymentDetails.length
  }, activeOrBoundPaymentDetails.map(function (paymentDetail) {
    return renderPaymentMethodItem(paymentDetail);
  }), !activeItems && /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
    icon: AddIcon,
    title: t('Add a payment method!'),
    subtitle: t('Set up a new payment method for your account'),
    withBorder: true,
    onClick: function onClick() {
      return showInnerPopup({
        type: _innerPopupReducer.POPUP_TYPES.paymentDetails
      });
    },
    isSmallCard: true
  })));
};
PaymentMethod.propTypes = {
  activeOrBoundPaymentDetails: _propTypes.default.arrayOf(_propTypes.default.objectOf(_propTypes.default.any)),
  error: _propTypes.default.arrayOf(_propTypes.default.string),
  paymentDetailsLoading: _propTypes.default.bool,
  showInnerPopup: _propTypes.default.func
};
PaymentMethod.defaultProps = {
  activeOrBoundPaymentDetails: [],
  error: [],
  paymentDetailsLoading: false,
  showInnerPopup: function showInnerPopup() {}
};
var _default = PaymentMethod;
exports.default = _default;