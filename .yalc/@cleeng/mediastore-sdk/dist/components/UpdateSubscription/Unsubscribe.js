"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _store = _interopRequireDefault(require("../../redux/store"));
var _updateSubscription = _interopRequireDefault(require("../../api/Customer/updateSubscription"));
var _planHelper = require("../../util/planHelper");
var _checkmarkBase = _interopRequireDefault(require("../../assets/images/checkmarkBase"));
var _Button = _interopRequireDefault(require("../Button"));
var _Checkbox = _interopRequireDefault(require("../Checkbox"));
var _InnerPopupWrapper = _interopRequireDefault(require("../InnerPopupWrapper"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _OfferCard = _interopRequireDefault(require("../OfferCard"));
var _InnerPopupWrapperStyled = require("../InnerPopupWrapper/InnerPopupWrapperStyled");
var _UpdateSubscriptionStyled = require("./UpdateSubscriptionStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Unsubscribe = function Unsubscribe(_ref) {
  var offerDetails = _ref.offerDetails,
    hideInnerPopup = _ref.hideInnerPopup,
    updateList = _ref.updateList,
    customCancellationReasons = _ref.customCancellationReasons,
    showInnerPopup = _ref.showInnerPopup,
    skipAvailableDowngradesStep = _ref.skipAvailableDowngradesStep,
    t = _ref.t;
  var STEPS = {
    DOWNGRADES: 'DOWNGRADES',
    SURVEY: 'SURVEY',
    CONFIRMATION: 'CONFIRMATION'
  };
  var EXTENDED_FLOW_STEP_NUMBER = {
    DOWNGRADES: 1,
    SURVEY: 2,
    CONFIRMATION: 3
  };
  var BASIC_FLOW_STEP_NUMBER = {
    SURVEY: 1,
    CONFIRMATION: 2
  };
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    downgradesList = _useState2[0],
    setDowngradesList = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    checkedReason = _useState4[0],
    setCheckedReason = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    isLoading = _useState6[0],
    setIsLoading = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    isError = _useState8[0],
    setIsError = _useState8[1];
  var getDowngrades = function getDowngrades() {
    var _store$getState = _store.default.getState(),
      planDetails = _store$getState.planDetails;
    if (planDetails && Object.keys(planDetails.switchSettings).length) {
      var switchSettings = planDetails.switchSettings[offerDetails.offerId];
      var availableSorted = (0, _toConsumableArray2.default)(switchSettings.available).filter(function (offer) {
        return offer.switchDirection === 'downgrade';
      }).sort(function (aOffer, bOffer) {
        return bOffer.price - aOffer.price;
      });
      return availableSorted;
    }
    return [];
  };
  var scheduledSwitch = function scheduledSwitch() {
    if (offerDetails.pendingSwitchId) {
      var _store$getState2 = _store.default.getState(),
        planDetails = _store$getState2.planDetails;
      return planDetails.switchDetails[offerDetails.pendingSwitchId];
    }
    return false;
  };
  var shouldShowDowngradeScreen = function shouldShowDowngradeScreen() {
    var _store$getState3 = _store.default.getState(),
      offerData = _store$getState3.innerPopup.data.offerData;
    if (skipAvailableDowngradesStep) {
      return false;
    }
    ;
    if (offerDetails.pendingSwitchId && scheduledSwitch().direction === 'downgrade') {
      return false;
    }
    if (!offerData.inTrial && getDowngrades().length) {
      return true;
    }
    return false;
  };
  var shouldShowDowngrades = shouldShowDowngradeScreen();
  var _useState9 = (0, _react.useState)(shouldShowDowngrades ? STEPS.DOWNGRADES : STEPS.SURVEY),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    currentStep = _useState10[0],
    setCurrentStep = _useState10[1];
  (0, _react.useEffect)(function () {
    if (shouldShowDowngrades) {
      setDowngradesList(function () {
        return getDowngrades();
      });
    }
  }, []);
  var defaultCancellationReasons = [{
    value: 'Poor customer support',
    key: 'support'
  }, {
    value: 'Switch to a different service',
    key: 'service'
  }, {
    value: 'Subscription is too expensive',
    key: 'expensive'
  }, {
    value: 'Video streaming issues',
    key: 'issues'
  }, {
    value: 'Not enough interesting content',
    key: 'content'
  }, {
    value: 'Service is hard to use',
    key: 'hardUse'
  }, {
    value: 'Content I like has ended',
    key: 'end'
  }];
  var calcellationReasonsToShow = customCancellationReasons || defaultCancellationReasons;
  var unsubscribe = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              window.dispatchEvent(new CustomEvent('MSSDK:unsubscribe-action-confirmed', {
                detail: {
                  offerId: offerDetails.offerId,
                  cancellationReason: checkedReason
                }
              }));
              _context.prev = 1;
              setIsLoading(true);
              _context.next = 5;
              return (0, _updateSubscription.default)({
                offerId: offerDetails.offerId,
                status: 'cancelled',
                cancellationReason: checkedReason
              });
            case 5:
              response = _context.sent;
              if (response.errors.length) {
                setIsError(true);
                setIsLoading(false);
              } else {
                setCurrentStep(STEPS.CONFIRMATION);
                setIsLoading(false);
              }
              _context.next = 13;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              setIsError(true);
              setIsLoading(false);
            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 9]]);
    }));
    return function unsubscribe() {
      return _ref2.apply(this, arguments);
    };
  }();
  var cancelUnsubscribeAction = function cancelUnsubscribeAction() {
    window.dispatchEvent(new CustomEvent('MSSDK:unsubscribe-action-cancelled'));
    hideInnerPopup();
  };
  var offerTitle = offerDetails.offerTitle,
    expiresAt = offerDetails.expiresAt,
    offerId = offerDetails.offerId;
  var formattedExpiresAt = (0, _planHelper.dateFormat)(expiresAt);
  var scheduledSwitchTitle = t("offer-title-".concat(scheduledSwitch().toOfferId), scheduledSwitch().title);
  var translatedTitle = t("offer-title-".concat(offerId), offerTitle);
  return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
    steps: shouldShowDowngrades ? 3 : 2,
    popupTitle: t('Manage your plan'),
    isError: isError,
    currentStep: shouldShowDowngrades ? EXTENDED_FLOW_STEP_NUMBER[currentStep] : BASIC_FLOW_STEP_NUMBER[currentStep]
  }, currentStep === STEPS.DOWNGRADES && /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('How about a plan downgrade instead of cancellation?')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('Here are the plans that might suit your needs:')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.DowngradesWrapperStyled, null, downgradesList.map(function (downgradeOffer) {
    return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.OfferCardWrapperStyled, {
      onClick: function onClick() {
        return showInnerPopup({
          type: 'switchPlan',
          data: {
            offerData: _objectSpread({}, downgradeOffer),
            isPartOfCancellationFlow: true
          }
        });
      },
      key: downgradeOffer.toOfferId
    }, /*#__PURE__*/_react.default.createElement(_OfferCard.default, {
      period: _planHelper.periodMapper[downgradeOffer.period].chargedForEveryText,
      offerType: "S",
      title: downgradeOffer.title,
      currency: downgradeOffer.nextPaymentPriceCurrencySymbol,
      price: Math.round(downgradeOffer.nextPaymentPrice * 100) / 100,
      offerId: downgradeOffer.toOfferId
    }));
  })), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('Or still wants to cancel a subscription?')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: hideInnerPopup
  }, t('Back to My Account')), /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "confirm",
    onClickFn: function onClickFn() {
      return setCurrentStep(STEPS.SURVEY);
    }
  }, t('Unsubscribe')))), currentStep === STEPS.SURVEY && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('We’re sorry to see you go')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, scheduledSwitch() ? t("Your subscription switch is still pending. You will switch to {{scheduledSwitchTitle}} and be charged a new price.", {
    scheduledSwitchTitle: scheduledSwitchTitle
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, offerDetails.inTrial ? t('Your {{translatedTitle}} free trial will end on {{formattedExpiresAt}}.', {
    translatedTitle: translatedTitle,
    formattedExpiresAt: formattedExpiresAt
  }) : t('Your {{translatedTitle}} subscription is paid until {{formattedExpiresAt}}.', {
    translatedTitle: translatedTitle,
    formattedExpiresAt: formattedExpiresAt
  })), ' ', /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, null, "If you would like to proceed with cancelling your subscription, please select 'Unsubscribe' below, and your subscription will be cancelled as of ", formattedExpiresAt, ". Until then, you will continue to have access to all of your current subscription features. Before you go, please let us know why you're leaving.")), calcellationReasonsToShow && /*#__PURE__*/_react.default.createElement(_UpdateSubscriptionStyled.ReasonsWrapper, null, calcellationReasonsToShow.map(function (reason) {
    return /*#__PURE__*/_react.default.createElement(_UpdateSubscriptionStyled.StyledItem, {
      key: reason.key
    }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      isRadioButton: true,
      onClickFn: function onClickFn() {
        return setCheckedReason(reason.value);
      },
      checked: reason.value === checkedReason
    }, t(reason.value)));
  }))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: function onClickFn() {
      return shouldShowDowngrades ? setCurrentStep(STEPS.DOWNGRADES) : cancelUnsubscribeAction();
    }
  }, t('Go back')), /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "confirm",
    onClickFn: unsubscribe,
    disabled: checkedReason === '' || isLoading
  }, isLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) || t('Unsubscribe')))), currentStep === STEPS.CONFIRMATION && /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _checkmarkBase.default,
    alt: "checkmark icon"
  }), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('Miss you already.')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('You have been successfully unsubscribed. Your current plan will expire on'), ' ', /*#__PURE__*/_react.default.createElement("b", null, (0, _planHelper.dateFormat)(offerDetails.expiresAt)), "."), /*#__PURE__*/_react.default.createElement(_Button.default, {
    width: "auto",
    margin: "30px auto 0 auto",
    onClickFn: function onClickFn() {
      hideInnerPopup();
      updateList();
    }
  }, t('Back to My Account'))));
};
Unsubscribe.propTypes = {
  hideInnerPopup: _propTypes.default.func.isRequired,
  showInnerPopup: _propTypes.default.func.isRequired,
  updateList: _propTypes.default.func.isRequired,
  offerDetails: _propTypes.default.objectOf(_propTypes.default.any).isRequired,
  customCancellationReasons: _propTypes.default.arrayOf(_propTypes.default.shape({
    key: _propTypes.default.string.isRequired,
    value: _propTypes.default.string.isRequired
  })),
  skipAvailableDowngradesStep: _propTypes.default.bool,
  t: _propTypes.default.func
};
Unsubscribe.defaultProps = {
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Unsubscribe));
exports.default = _default;