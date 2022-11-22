"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _updatePayPalPaymentDetails = _interopRequireDefault(require("../../../api/PaymentDetails/updatePayPalPaymentDetails"));
var _Loader = _interopRequireDefault(require("../../Loader"));
var _InnerPopupWrapperStyled = require("../../InnerPopupWrapper/InnerPopupWrapperStyled");
var _Button = _interopRequireDefault(require("../../Button"));
var _reactI18next = require("react-i18next");
var _UpdatePaymentDetailsPopupStyled = require("../UpdatePaymentDetailsPopupStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var AddPayPal = function AddPayPal(_ref) {
  var setStep = _ref.setStep;
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
  var publisherPaymentMethods = (0, _reactRedux.useSelector)(function (state) {
    return state.paymentInfo.publisherPaymentMethods;
  });
  var addPayPalPaymentDetails = function addPayPalPaymentDetails() {
    setIsButtonLoading(true);
    setIsError(false);
    (0, _updatePayPalPaymentDetails.default)(publisherPaymentMethods.paypal).then(function (resp) {
      window.dispatchEvent(new CustomEvent('MSSDK:update-payment-details-successful'));
      window.location.href = resp.responseData.redirectUrl;
    }).catch(function () {
      window.dispatchEvent(new CustomEvent('MSSDK:update-payment-details-failed'));
      setIsButtonLoading(false);
      setIsError(true);
    });
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, "PayPal"), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('Paying with PayPal is easy. Click the button below and sign in to your PayPal account.'), /*#__PURE__*/_react.default.createElement("br", null), t('Note, PayPal is subject to an additional 8% fee that will be added to your next payments.')), /*#__PURE__*/_react.default.createElement(_Button.default, {
    size: "normal",
    width: "50%",
    margin: "40px auto auto auto",
    theme: "paypal",
    onClickFn: addPayPalPaymentDetails
  }, isButtonLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopupStyled.PPIconStyled, null), "PayPal")), isError && /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopupStyled.ErrorMessage, null, t('Oops, something went wrong! Try again...'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: function onClickFn() {
      return setStep(function (currentStep) {
        return currentStep - 1;
      });
    }
  }, t('Back'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.WarningMessageStyled, null, "Your new details will replace the details used for your other active subscriptions."));
};
var _default = AddPayPal;
exports.default = _default;
AddPayPal.propTypes = {
  setStep: _propTypes.default.func
};
AddPayPal.defaultProps = {
  setStep: function setStep() {}
};