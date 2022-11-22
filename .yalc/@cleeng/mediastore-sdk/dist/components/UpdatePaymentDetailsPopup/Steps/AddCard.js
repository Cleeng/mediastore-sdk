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
var _updateAdyenPaymentDetails = _interopRequireDefault(require("../../../api/PaymentDetails/updateAdyenPaymentDetails"));
var _InnerPopupWrapperStyled = require("../../InnerPopupWrapper/InnerPopupWrapperStyled");
var _Button = _interopRequireDefault(require("../../Button"));
var _Adyen = _interopRequireDefault(require("../../Adyen"));
var _reactI18next = require("react-i18next");
var _UpdatePaymentDetailsPopupStyled = require("../UpdatePaymentDetailsPopupStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var AddCard = function AddCard(_ref) {
  var setStep = _ref.setStep,
    updatePaymentDetailsSection = _ref.updatePaymentDetailsSection;
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
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t;
  var addAdyenPaymentDetails = function addAdyenPaymentDetails(_ref2) {
    var card = _ref2.data.paymentMethod;
    setIsButtonLoading(true);
    setIsError(false);
    (0, _updateAdyenPaymentDetails.default)(publisherPaymentMethods.adyen, card).then(function (resp) {
      setIsButtonLoading(false);
      if (!resp.errors.length) {
        window.dispatchEvent(new CustomEvent('MSSDK:update-payment-details-successful'));
        setStep(function (currentStep) {
          return currentStep + 1;
        });
        updatePaymentDetailsSection();
      } else {
        window.dispatchEvent(new CustomEvent('MSSDK:update-payment-details-failed'));
        setIsError(true);
      }
    }).catch(function () {
      setIsButtonLoading(false);
      setIsError(true);
    });
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('Add your card')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('Enter your card details here')), /*#__PURE__*/_react.default.createElement(_Adyen.default, {
    onSubmit: addAdyenPaymentDetails,
    isCheckout: false,
    isPaymentProcessing: isButtonLoading
  }), isError && /*#__PURE__*/_react.default.createElement(_UpdatePaymentDetailsPopupStyled.ErrorMessage, null, t('Oops, something went wrong! Try again...'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    style: {
      margin: '10px 0 0 0'
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: function onClickFn() {
      return setStep(function (currentStep) {
        return currentStep - 1;
      });
    }
  }, t('Back'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.WarningMessageStyled, null, "Your new details will replace the details used for your other active subscriptions."));
};
AddCard.propTypes = {
  setStep: _propTypes.default.func,
  updatePaymentDetailsSection: _propTypes.default.func
};
AddCard.defaultProps = {
  setStep: function setStep() {},
  updatePaymentDetailsSection: function updatePaymentDetailsSection() {}
};
var _default = AddCard;
exports.default = _default;