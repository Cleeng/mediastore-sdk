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
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _InnerPopupWrapper = _interopRequireDefault(require("../InnerPopupWrapper"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Button = _interopRequireDefault(require("../Button"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _api = require("../../api");
var _checkmarkBase = _interopRequireDefault(require("../../assets/images/checkmarkBase"));
var _InnerPopupWrapperStyled = require("../InnerPopupWrapper/InnerPopupWrapperStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var CancelSwitchPopup = function CancelSwitchPopup(_ref) {
  var _ref$popupData = _ref.popupData,
    pendingSwitchId = _ref$popupData.pendingSwitchId,
    switchDirection = _ref$popupData.switchDirection,
    untranslatedSwitchOfferTitle = _ref$popupData.switchOfferTitle,
    untranslatedBaseOfferTitle = _ref$popupData.baseOfferTitle,
    baseOfferExpirationDate = _ref$popupData.baseOfferExpirationDate,
    baseOfferPrice = _ref$popupData.baseOfferPrice,
    hideInnerPopup = _ref.hideInnerPopup,
    updateList = _ref.updateList,
    setSwitchDetails = _ref.setSwitchDetails,
    t = _ref.t;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isError = _useState4[0],
    setIsError = _useState4[1];
  var _useState5 = (0, _react.useState)(1),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    step = _useState6[0],
    setStep = _useState6[1];
  var planDetailsState = (0, _reactRedux.useSelector)(function (state) {
    return state.planDetails;
  });
  var switchDetails = planDetailsState.switchDetails[pendingSwitchId];
  var eventsPayload = {
    pendingSwitchId: pendingSwitchId,
    fromOfferId: switchDetails && switchDetails.fromOfferId,
    toOfferId: switchDetails && switchDetails.toOfferId
  };
  var _useState7 = (0, _react.useState)({}),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    offerIdsFallback = _useState8[0],
    setOfferIdsFallback = _useState8[1]; // required to keep translations in step 2
  (0, _react.useEffect)(function () {
    if (switchDetails) {
      setOfferIdsFallback({
        fromOfferId: switchDetails && switchDetails.fromOfferId,
        toOfferId: switchDetails && switchDetails.toOfferId
      });
    }
  }, [switchDetails]);
  var baseOfferTitle = t("offer-title-".concat(offerIdsFallback.fromOfferId), untranslatedBaseOfferTitle);
  var switchOfferTitle = t("offer-title-".concat(offerIdsFallback.toOfferId), untranslatedSwitchOfferTitle);
  var cancelSwitch = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var resp;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              window.dispatchEvent(new CustomEvent('MSSDK:cancel-switch-action-triggered', {
                detail: eventsPayload
              }));
              setIsLoading(true);
              _context.prev = 2;
              _context.next = 5;
              return (0, _api.updateSwitch)(pendingSwitchId);
            case 5:
              resp = _context.sent;
              if (!resp.errors.length) {
                setIsLoading(false);
                setSwitchDetails({
                  details: {
                    pendingSwitchId: pendingSwitchId
                  },
                  type: 'delete'
                });
                setStep(2);
                window.dispatchEvent(new CustomEvent('MSSDK:cancel-switch-action-successful', {
                  detail: eventsPayload
                }));
              } else {
                setIsError(true);
                setIsLoading(false);
                window.dispatchEvent(new CustomEvent('MSSDK:cancel-switch-action-failed', {
                  detail: _objectSpread(_objectSpread({}, eventsPayload), {}, {
                    reason: resp.errors[0]
                  })
                }));
              }
              _context.next = 14;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);
              setIsError(true);
              setIsLoading(false);
              window.dispatchEvent(new CustomEvent('MSSDK:cancel-switch-action-failed', {
                detail: eventsPayload
              }));
            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 9]]);
    }));
    return function cancelSwitch() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
    steps: 2,
    popupTitle: t('Cancel switch'),
    currentStep: step,
    isError: isError
  }, step === 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('Cancel switch')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t("Your {{switchDirection}} to {{switchOfferTitle}} is still pending and will take effect on {{baseOfferExpirationDate}}. If you decide to cancel the switch, you will keep access to current plan and be charged {{baseOfferPrice}} on the next billing date.", {
    switchDirection: switchDirection,
    switchOfferTitle: switchOfferTitle,
    baseOfferExpirationDate: baseOfferExpirationDate,
    baseOfferPrice: baseOfferPrice
  }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), t('Are you sure you want to cancel the switch?'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: function onClickFn() {
      window.dispatchEvent(new CustomEvent('MSSDK:cancel-switch-action-cancelled', {
        detail: eventsPayload
      }));
      hideInnerPopup();
    }
  }, t('No, thanks')), /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "danger",
    onClickFn: cancelSwitch
  }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) : t("Cancel switch")))), step === 2 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _checkmarkBase.default,
    alt: "checkmark icon"
  }), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('Switch canceled')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t("You have successfully canceled your {{switchDirection}} to {{switchOfferTitle}}. You will be charged a current price on {{baseOfferExpirationDate}} and keep access to {{baseOfferTitle}}.", {
    switchDirection: switchDirection,
    switchOfferTitle: switchOfferTitle,
    baseOfferExpirationDate: baseOfferExpirationDate,
    baseOfferTitle: baseOfferTitle
  }))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "confirm",
    onClickFn: function onClickFn() {
      updateList();
      hideInnerPopup();
    }
  }, t('Back to My Account')))));
};
CancelSwitchPopup.propTypes = {
  popupData: _propTypes.default.shape({
    pendingSwitchId: _propTypes.default.string.isRequired,
    baseOfferTitle: _propTypes.default.string.isRequired,
    baseOfferExpirationDate: _propTypes.default.string.isRequired,
    baseOfferPrice: _propTypes.default.string.isRequired,
    switchDirection: _propTypes.default.string.isRequired,
    switchOfferTitle: _propTypes.default.string.isRequired
  }).isRequired,
  hideInnerPopup: _propTypes.default.func.isRequired,
  updateList: _propTypes.default.func,
  setSwitchDetails: _propTypes.default.func.isRequired,
  t: _propTypes.default.func
};
CancelSwitchPopup.defaultProps = {
  updateList: function updateList() {},
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(CancelSwitchPopup));
exports.default = _default;