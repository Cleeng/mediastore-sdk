"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureSwitchPlanPopup = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _formatNumber = _interopRequireDefault(require("../../util/formatNumber"));
var _api = require("../../api");
var _Button = _interopRequireDefault(require("../Button"));
var _InnerPopupWrapper = _interopRequireDefault(require("../InnerPopupWrapper"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _planHelper = require("../../util/planHelper");
var _checkmarkBase = _interopRequireDefault(require("../../assets/images/checkmarkBase"));
var _InnerPopupWrapperStyled = require("../InnerPopupWrapper/InnerPopupWrapperStyled");
var _SkeletonWrapper = _interopRequireDefault(require("../SkeletonWrapper"));
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _SwitchPlanPopupStyled = require("./SwitchPlanPopupStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Close = function Close(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("style", null, ".a", "{", "fill:#cb4477", "}")), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M83.448 13.624V0H0v80.042h11.921v11.921h81.745V13.624ZM3.406 76.636V3.406h76.636v10.218H11.921v63.012ZM90.26 88.557H15.327V17.03H90.26Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M67.244 38.343a1.7 1.7 0 0 0-2.408 0L52.793 50.385 40.751 38.343a1.703 1.703 0 0 0-2.408 2.408l12.042 12.042-12.042 12.042a1.703 1.703 0 1 0 2.408 2.408l12.042-12.042 12.042 12.043a1.703 1.703 0 0 0 2.408-2.408L55.201 52.793l12.043-12.042a1.7 1.7 0 0 0 0-2.408Z"
  }));
};
Close.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "93.667",
  height: "91.963"
};
var SwitchPlanPopup = function SwitchPlanPopup(_ref) {
  var toOffer = _ref.toOffer,
    fromOffer = _ref.fromOffer,
    hideInnerPopup = _ref.hideInnerPopup,
    showInnerPopup = _ref.showInnerPopup,
    updateList = _ref.updateList,
    isPopupLoading = _ref.isPopupLoading,
    onCancel = _ref.onCancel,
    onSwitchSuccess = _ref.onSwitchSuccess,
    onSwitchError = _ref.onSwitchError,
    isPartOfCancellationFlow = _ref.isPartOfCancellationFlow,
    t = _ref.t;
  var STEPS = {
    SWITCH_DETAILS: 'SWITCH_DETAILS',
    CONFIRMATION: 'CONFIRMATION'
  };
  var STEPS_NUMBERS = {
    SWITCH_DETAILS: 1,
    CONFIRMATION: 2
  };
  var _useState = (0, _react.useState)(STEPS.SWITCH_DETAILS),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    step = _useState2[0],
    setStep = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    isError = _useState6[0],
    setError = _useState6[1];
  var changePlan = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var resp;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              _context.prev = 1;
              _context.next = 4;
              return (0, _api.subscriptionSwitch)(fromOffer.offerId, toOffer.toOfferId, toOffer.switchDirection);
            case 4:
              resp = _context.sent;
              if (!resp.errors.length) {
                window.dispatchEvent(new CustomEvent('MSSDK:switch-popup-action-successful', {
                  detail: {
                    fromOfferId: fromOffer.offerId,
                    toOfferId: toOffer.toOfferId,
                    switchDirection: toOffer.switchDirection,
                    algorithm: toOffer.algorithm
                  }
                }));
                setIsLoading(false);
                setStep(STEPS.CONFIRMATION);
              } else {
                window.dispatchEvent(new CustomEvent('MSSDK:switch-popup-action-failed', {
                  detail: {
                    reason: resp.errors[0]
                  }
                }));
                setError(true);
                setIsLoading(false);
              }
              _context.next = 13;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              window.dispatchEvent(new CustomEvent('MSSDK:switch-popup-action-failed'));
              setError(true);
              setIsLoading(false);
            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }));
    return function changePlan() {
      return _ref2.apply(this, arguments);
    };
  }();
  var closePopupAndRefresh = function closePopupAndRefresh() {
    hideInnerPopup();
    updateList();
  };
  if (isPopupLoading) {
    return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
      steps: 2,
      popupTitle: t('Change Plan'),
      currentStep: 1
    }, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
      showChildren: false,
      height: 200,
      width: 450,
      margin: "auto"
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
    steps: isPartOfCancellationFlow ? 3 : 2,
    popupTitle: t('Change Plan'),
    currentStep: isPartOfCancellationFlow ? STEPS_NUMBERS[step] + 1 : STEPS_NUMBERS[step]
  }, step === STEPS.SWITCH_DETAILS && !isError && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.ImageWrapper, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.SubscriptionIconStyled, {
    period: fromOffer.period,
    showLabel: "Current",
    gray: true
  }), /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.ArrowStyled, null), /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.SubscriptionIconStyled, {
    period: toOffer.period,
    showLabel: "New"
  })), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, {
    step: step,
    textTransform: "capitalize"
  }, t(toOffer.switchDirection)), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, {
    step: step
  }, /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-info"
  }, "You are about to change your plan from", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    fromOfferTitle: t("offer-title-".concat(fromOffer.offerId), fromOffer.offerTitle)
  }), ' ', "to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    toOfferTitle: t("offer-title-".concat(toOffer.toOfferId), toOffer.title)
  }), "."), ' ', toOffer.algorithm === 'IMMEDIATE_WITHOUT_PRORATION' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-info-immediatewithoutproration"
  }, "You will be immediately granted access to your selected plan and charged a new price", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "on your next billing date", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    expiresAt: (0, _planHelper.dateFormat)(fromOffer.expiresAt)
  })), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_REFUND' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-info-immediateandchargewithrefund"
  }, "You will be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "and immediately granted access to your selected plan. The remaining value from the previous subscription will be refunded. You will continue to be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "on a recurring basis until you cancel."), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_FULL_REFUND' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-info-immediateandchargewithfullrefund"
  }, "You will be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ". You will also be fully refunded for your previous subscription. You will continue to be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "on a recurring basis until you cancel."), toOffer.algorithm === 'DEFERRED' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-info-deferred"
  }, "You will continue to have access to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currentPlan: t("offer-title-".concat(fromOffer.offerId), fromOffer.offerTitle)
  }), ' ', "until", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    expiresAt: (0, _planHelper.dateFormat)(fromOffer.expiresAt)
  }), ". From that time you will be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "on a recurring basis for your new subscription."), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_FULL_PRICE' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-info-immediateandchargefullprice"
  }, "You will be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "and immediately granted access to the selected plan. You will continue to be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "on a recurring basis until you cancel."), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-info-immediateandchargewithoutproration"
  }, "You will be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "and immediately granted access to the selected plan."), toOffer.algorithm === 'IMMEDIATE_WITH_TIME_PRORATION' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-info-immediatewithtimeproration"
  }, "You will be immediately granted access to your selected plan. Your next billing date will be changed and pushed towards, based on the time left on your previous subscription. From that time, you will be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "on a recurring basis."), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_TIME_PRORATION' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-info-immediateandchargewithtimeproration"
  }, "You will be immediately charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "and granted access to the selected plan. Your next billing date will be changed and pushed towards, based on the time left on your previous subscription.", ' '), /*#__PURE__*/_react.default.createElement("br", null), toOffer.couponNotApplicable && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), t('Your current coupon will not apply to the new plan. If you have a coupon for your new plan, you can apply it after confirming your switch.'), /*#__PURE__*/_react.default.createElement("br", null)), /*#__PURE__*/_react.default.createElement("br", null), t('Do you want to apply the change now?'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: function onClickFn() {
      if (isPartOfCancellationFlow) {
        showInnerPopup({
          type: _innerPopupReducer.POPUP_TYPES.updateSubscription,
          data: {
            action: 'unsubscribe',
            offerData: _objectSpread({}, fromOffer)
          }
        });
      } else if (onCancel) {
        onCancel();
      } else {
        window.dispatchEvent(new CustomEvent('MSSDK:switch-popup-action-cancelled', {
          detail: {
            fromOfferId: fromOffer.offerId,
            toOfferId: toOffer.toOfferId,
            switchDirection: toOffer.switchDirection,
            algorithm: toOffer.algorithm
          }
        }));
        hideInnerPopup();
      }
    }
  }, t('Keep Current Plan')), /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "confirm",
    onClickFn: changePlan
  }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) : t("Change Plan")))), step === STEPS.CONFIRMATION && !isError && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.ImageWrapper, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.ImageStyled, {
    src: _checkmarkBase.default,
    alt: "checkmark icon"
  })), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, {
    step: step
  }, t('Thank you!')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, {
    step: step
  }, toOffer.algorithm === 'IMMEDIATE_WITHOUT_PRORATION' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-confirm-immediatewithoutproration"
  }, "You have successfully changed your plan to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    newPlan: t("offer-title-".concat(toOffer.toOfferId), toOffer.title)
  }), ". Your new fee will be", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "starting from", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    expiresAt: (0, _planHelper.dateFormat)(fromOffer.expiresAt)
  }), "."), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_REFUND' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-confirm-immediateandchargewithrefund"
  }, "You have successfully changed your plan to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    newPlan: t("offer-title-".concat(toOffer.toOfferId), toOffer.title)
  }), ". Your new fee is", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: (0, _formatNumber.default)(toOffer.nextPaymentPrice)
  }), ' ', "starting from now."), toOffer.algorithm === 'DEFERRED' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-confirm-deferred"
  }, "You have successfully requested the switch to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    newPlan: t("offer-title-".concat(toOffer.toOfferId), toOffer.title)
  }), ". You will have access to your new plan on", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    expiresAt: (0, _planHelper.dateFormat)(fromOffer.expiresAt)
  }), ' ', "and be charged", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: toOffer.nextPaymentPrice
  }), "."), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_FULL_PRICE' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-confirm-immediateandchargefullprice"
  }, "You have successfully changed your plan to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    newPlan: t("offer-title-".concat(toOffer.toOfferId), toOffer.title)
  }), ". Your new fee will be", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: toOffer.nextPaymentPrice
  }), ' ', "starting from now."), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_FULL_REFUND' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-confirm-immediateandchargewithfullrefund"
  }, "You have successfully changed your plan to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    newPlan: t("offer-title-".concat(toOffer.toOfferId), toOffer.title)
  }), ". Your new fee will be", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: toOffer.nextPaymentPrice
  }), ' ', "starting from now."), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-confirm-immediateandchargewithoutproration"
  }, "You have successfully changed your plan to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    newPlan: t("offer-title-".concat(toOffer.toOfferId), toOffer.title)
  }), ". Your new fee will be", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: toOffer.nextPaymentPrice
  }), ' ', "starting from now."), toOffer.algorithm === 'IMMEDIATE_WITH_TIME_PRORATION' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-confirm-immediatewithtimeproration"
  }, "You have successfully changed your plan to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    newPlan: t("offer-title-".concat(toOffer.toOfferId), toOffer.title)
  }), ". Your new fee will be", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: toOffer.nextPaymentPrice
  }), ' ', "and you will be charged on a recurring basis until you cancel."), toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_TIME_PRORATION' && /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    i18nKey: "switchplanpopup-confirm-immediateandchargewithtimeproration"
  }, "You have successfully changed your plan to", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    newPlan: t("offer-title-".concat(toOffer.toOfferId), toOffer.title)
  }), ". Your new fee will be", ' ', /*#__PURE__*/_react.default.createElement("strong", null, {
    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol
  }, {
    nextPaymentPrice: toOffer.nextPaymentPrice
  }), ' ', "and you will be charged on a recurring basis until you cancel."))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "confirm",
    onClickFn: onSwitchSuccess || closePopupAndRefresh
  }, t('Back to My Account')))), isError && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.ImageWrapper, null, /*#__PURE__*/_react.default.createElement(Close, null)), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, {
    step: step
  }, t('An error occurred.')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, {
    step: step
  }, t('We have been unable to change your plan to {{ title }} as an error occurred. Sorry for the inconvenience, please try again.', {
    title: toOffer.title
  }))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "confirm",
    onClickFn: onSwitchError || closePopupAndRefresh
  }, t('Back to My Account')))));
};
exports.PureSwitchPlanPopup = SwitchPlanPopup;
SwitchPlanPopup.propTypes = {
  toOffer: _propTypes.default.objectOf(_propTypes.default.any),
  fromOffer: _propTypes.default.objectOf(_propTypes.default.any),
  hideInnerPopup: _propTypes.default.func,
  updateList: _propTypes.default.func,
  isPopupLoading: _propTypes.default.bool,
  t: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  onSwitchSuccess: _propTypes.default.func,
  onSwitchError: _propTypes.default.func,
  isPartOfCancellationFlow: _propTypes.default.bool,
  showInnerPopup: _propTypes.default.func
};
SwitchPlanPopup.defaultProps = {
  toOffer: {},
  fromOffer: {},
  hideInnerPopup: function hideInnerPopup() {},
  showInnerPopup: function showInnerPopup() {},
  updateList: function updateList() {},
  isPopupLoading: false,
  t: function t(k) {
    return k;
  },
  onCancel: null,
  onSwitchSuccess: null,
  onSwitchError: null,
  isPartOfCancellationFlow: false
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(SwitchPlanPopup));
exports.default = _default;