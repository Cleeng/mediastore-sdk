"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _InnerPopupWrapperStyled = require("../../InnerPopupWrapper/InnerPopupWrapperStyled");
var _UpdatePaymentDetailsPopupStyled = require("../UpdatePaymentDetailsPopupStyled");
var _Loader = _interopRequireDefault(require("../../Loader"));
var _Button = _interopRequireDefault(require("../../Button"));
var _deletePaymentDetails = _interopRequireDefault(require("../../../api/PaymentDetails/deletePaymentDetails"));
var _reactI18next = require("react-i18next");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PaypalIcon = function PaypalIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M38.683 24.669h-2.455a.709.709 0 0 0-.586.311l-3.386 4.986-1.434-4.791a.71.71 0 0 0-.679-.505H27.73a.425.425 0 0 0-.4.562l2.7 7.933-2.541 3.585a.425.425 0 0 0 .347.671h2.452a.712.712 0 0 0 .583-.3l8.162-11.78a.425.425 0 0 0-.349-.667Zm-16.408 4.753a2.723 2.723 0 0 1-2.756 2.332 1.892 1.892 0 0 1-2.019-2.375 2.732 2.732 0 0 1 2.736-2.349 2.056 2.056 0 0 1 1.628.665 2.1 2.1 0 0 1 .414 1.727Zm3.4-4.753h-2.438a.425.425 0 0 0-.42.359l-.107.682-.17-.247a3.478 3.478 0 0 0-2.885-1.024 5.615 5.615 0 0 0-5.45 4.912 4.607 4.607 0 0 0 .909 3.751 3.82 3.82 0 0 0 3.075 1.241 4.675 4.675 0 0 0 3.381-1.4l-.109.678a.425.425 0 0 0 .42.491h2.2a.708.708 0 0 0 .7-.6l1.32-8.359a.425.425 0 0 0-.42-.49Zm-14.653.058c-.279 1.83-1.676 1.83-3.029 1.83h-.77l.539-3.417a.424.424 0 0 1 .42-.359h.358c.92 0 1.79 0 2.238.524a1.7 1.7 0 0 1 .248 1.422Zm-.588-4.776h-5.1a.708.708 0 0 0-.7.6L2.576 33.625a.425.425 0 0 0 .42.491h2.435a.708.708 0 0 0 .7-.6l.557-3.528a.708.708 0 0 1 .7-.6H9c3.359 0 5.3-1.625 5.8-4.847a3.926 3.926 0 0 0-.65-3.29 4.727 4.727 0 0 0-3.716-1.3Zm54.489.359-2.09 13.315a.425.425 0 0 0 .42.491h2.1a.708.708 0 0 0 .7-.6l2.064-13.075a.425.425 0 0 0-.42-.491h-2.351a.425.425 0 0 0-.42.359Zm-6.281 9.111a2.723 2.723 0 0 1-2.756 2.332 1.892 1.892 0 0 1-2.022-2.374A2.732 2.732 0 0 1 56.6 27.03a2.056 2.056 0 0 1 1.628.665 2.1 2.1 0 0 1 .414 1.727Zm3.4-4.753h-2.436a.425.425 0 0 0-.42.359l-.107.682-.171-.247a3.476 3.476 0 0 0-2.884-1.024 5.615 5.615 0 0 0-5.45 4.912 4.607 4.607 0 0 0 .909 3.751 3.82 3.82 0 0 0 3.075 1.241 4.675 4.675 0 0 0 3.381-1.4l-.109.678a.425.425 0 0 0 .42.491h2.2a.708.708 0 0 0 .7-.6l1.32-8.359a.425.425 0 0 0-.42-.491Zm-14.653.058c-.279 1.83-1.676 1.83-3.029 1.83h-.76l.539-3.417a.424.424 0 0 1 .42-.359h.353c.92 0 1.79 0 2.238.524a1.705 1.705 0 0 1 .247 1.422Zm-.588-4.776h-5.1a.708.708 0 0 0-.7.6l-2.055 13.075a.425.425 0 0 0 .42.491h2.616a.5.5 0 0 0 .49-.418l.585-3.707a.708.708 0 0 1 .7-.6h1.613c3.359 0 5.3-1.625 5.8-4.847a3.926 3.926 0 0 0-.65-3.29 4.727 4.727 0 0 0-3.716-1.3Z",
    transform: "translate(-2.571 -19.952)",
    style: {
      fill: "#5a9dd8"
    }
  }));
};
PaypalIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "65.556",
  height: "17.469"
};
var VisaIcon = function VisaIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M11.779 20.811a1.779 1.779 0 0 0-2-1.442H2.623l-.053.346c4.911 1.255 8.942 3.924 10.757 8.969l-1.549-7.874Zm2 10.25-.453-2.376a10.716 10.716 0 0 0-5.767-5.82l3.6 13.614h4.672l6.969-17.11h-4.7l-4.319 11.692Zm12.466 5.444 2.776-17.135h-4.43l-2.776 17.135Zm12.09-17.429c-4.378 0-7.446 2.323-7.473 5.658-.027 2.457 2.189 3.817 3.87 4.646 1.736.827 2.3 1.387 2.3 2.134 0 1.148-1.387 1.656-2.642 1.656a8.4 8.4 0 0 1-4.164-.881l-.588-.294-.614 3.843a12.909 12.909 0 0 0 4.938.909c4.644.027 7.662-2.3 7.714-5.845 0-1.949-1.2-3.417-3.737-4.646-1.547-.772-2.481-1.335-2.481-2.134 0-.72.8-1.469 2.535-1.469a7.362 7.362 0 0 1 3.309.642l.4.212.613-3.71a11.011 11.011 0 0 0-3.977-.721Zm11.905.294a2.191 2.191 0 0 0-2.323 1.442l-6.564 15.693H46c.749-2.107.936-2.563.936-2.563h5.658s.135.588.533 2.563h4.111L53.659 19.37h-3.416Zm-2.054 11.051s.373-.988 1.763-4.778c-.027.027.373-.988.588-1.628l.319 1.469a400.79 400.79 0 0 0 1.016 4.938h-3.686Z",
    transform: "translate(-2.571 -19.076)",
    style: {
      fill: "#344daa"
    }
  }));
};
VisaIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "54.665",
  height: "17.671"
};
var PaymentMethodIcons = {
  paypal: PaypalIcon,
  visa: VisaIcon
};
var DeletePaymentMethod = function DeletePaymentMethod(_ref) {
  var hideInnerPopup = _ref.hideInnerPopup,
    setStep = _ref.setStep,
    updatePaymentDetailsSection = _ref.updatePaymentDetailsSection,
    paymentDetailsToDelete = _ref.paymentDetailsToDelete;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isError = _useState2[0],
    setIsError = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isButtonLoading = _useState4[0],
    setIsButtonLoading = _useState4[1];
  var deletePaymentMethod = function deletePaymentMethod() {
    window.dispatchEvent(new CustomEvent('MSSDK:remove-payment-details-action-confirmed'));
    setIsError(false);
    setIsButtonLoading(true);
    (0, _deletePaymentDetails.default)(paymentDetailsToDelete.id).then(function (resp) {
      if (!resp.errors.length) {
        setIsButtonLoading(false);
        setStep(function (currentStep) {
          return currentStep + 1;
        });
        updatePaymentDetailsSection();
      } else {
        setIsButtonLoading(false);
        setIsError(true);
      }
    }).catch(function () {
      setIsButtonLoading(false);
      setIsError(true);
    });
  };
  var cancelDeleteAction = function cancelDeleteAction() {
    window.dispatchEvent(new CustomEvent('MSSDK:remove-payment-details-action-cancelled'));
    hideInnerPopup();
  };
  var paymentMethodSpecificParams = paymentDetailsToDelete.paymentMethodSpecificParams;
  var LogoComponent = PaymentMethodIcons[paymentMethodSpecificParams.variant] ? PaymentMethodIcons[paymentMethodSpecificParams.variant] : PaymentMethodIcons[paymentDetailsToDelete.paymentMethod];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, LogoComponent && /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopupStyled.PopupImageStyled, null, /*#__PURE__*/_react.default.createElement(LogoComponent, null)), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('Remove payment method?')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('By clicking the REMOVE button you will delete this payment method.'), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), t('Any subscriptions connected with this payment method will not be renewed, unless another payment method is added.')), isError && /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopupStyled.ErrorMessage, null, t('Oops, something went wrong! Try again...'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: function onClickFn() {
      return cancelDeleteAction();
    }
  }, t('No, thanks')), /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "danger",
    onClickFn: deletePaymentMethod
  }, isButtonLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) : t('Remove'))));
};
var _default = DeletePaymentMethod;
exports.default = _default;
DeletePaymentMethod.propTypes = {
  paymentDetailsToDelete: _propTypes.default.objectOf(_propTypes.default.any),
  hideInnerPopup: _propTypes.default.func,
  updatePaymentDetailsSection: _propTypes.default.func,
  setStep: _propTypes.default.func
};
DeletePaymentMethod.defaultProps = {
  paymentDetailsToDelete: {},
  hideInnerPopup: function hideInnerPopup() {},
  updatePaymentDetailsSection: function updatePaymentDetailsSection() {},
  setStep: function setStep() {}
};