"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _updateSubscription = _interopRequireDefault(require("../../api/Customer/updateSubscription"));
var _planHelper = require("../../util/planHelper");
var _checkmarkBase = _interopRequireDefault(require("../../assets/images/checkmarkBase"));
var _Button = _interopRequireDefault(require("../Button"));
var _InnerPopupWrapper = _interopRequireDefault(require("../InnerPopupWrapper"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _InnerPopupWrapperStyled = require("../InnerPopupWrapper/InnerPopupWrapperStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Resubscribe = function Resubscribe(_ref) {
  var offerDetails = _ref.offerDetails,
    hideInnerPopup = _ref.hideInnerPopup,
    updateList = _ref.updateList,
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
    currentStep = _useState6[0],
    setCurrentStep = _useState6[1];
  var expiresAt = offerDetails.expiresAt,
    nextPaymentPrice = offerDetails.nextPaymentPrice,
    nextPaymentCurrency = offerDetails.nextPaymentCurrency;
  var currencySymbol = _planHelper.currencyFormat[nextPaymentCurrency];
  var resubscribe = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              window.dispatchEvent(new CustomEvent('MSSDK:resume-action-confirmed', {
                detail: {
                  offerId: offerDetails.offerId
                }
              }));
              _context.prev = 1;
              setIsLoading(true);
              _context.next = 5;
              return (0, _updateSubscription.default)({
                offerId: offerDetails.offerId,
                status: 'active'
              });
            case 5:
              response = _context.sent;
              if (response.errors.length) {
                setIsLoading(false);
                setIsError(true);
              } else {
                setIsLoading(false);
                setCurrentStep(2);
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
    return function resubscribe() {
      return _ref2.apply(this, arguments);
    };
  }();
  var cancelResubscribeAction = function cancelResubscribeAction() {
    window.dispatchEvent(new CustomEvent('MSSDK:resume-action-cancelled'));
    hideInnerPopup();
  };
  return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
    steps: 2,
    popupTitle: t('Manage your plan'),
    isError: isError,
    currentStep: currentStep
  }, currentStep === 1 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('Resume your plan')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('By clicking the button below you can resume your plan. Your next bill will be on'), ' ', /*#__PURE__*/_react.default.createElement("b", null, (0, _planHelper.dateFormat)(expiresAt), " "), t('and it will be'), ' ', /*#__PURE__*/_react.default.createElement("b", null, "".concat(currencySymbol).concat(nextPaymentPrice)), ".")), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: function onClickFn() {
      return cancelResubscribeAction();
    }
  }, t('No, thanks')), /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "confirm",
    onClickFn: resubscribe,
    disabled: isLoading
  }, isLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) || t('Resume')))) : /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement("img", {
    src: _checkmarkBase.default,
    alt: "checkmark icon"
  }), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t('Your plan has been renewed')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t('You have been successfully resubscribed. Your fee will be'), ' ', /*#__PURE__*/_react.default.createElement("b", null, "".concat(currencySymbol).concat(nextPaymentPrice)), " ", t('started from'), ' ', /*#__PURE__*/_react.default.createElement("b", null, " ", (0, _planHelper.dateFormat)(expiresAt), ".")), /*#__PURE__*/_react.default.createElement(_Button.default, {
    width: "auto",
    margin: "30px auto 0 auto",
    onClickFn: function onClickFn() {
      hideInnerPopup();
      updateList();
    }
  }, t('Back to My Account'))));
};
Resubscribe.propTypes = {
  hideInnerPopup: _propTypes.default.func.isRequired,
  updateList: _propTypes.default.func.isRequired,
  offerDetails: _propTypes.default.objectOf(_propTypes.default.any).isRequired,
  t: _propTypes.default.func
};
Resubscribe.defaultProps = {
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Resubscribe));
exports.default = _default;