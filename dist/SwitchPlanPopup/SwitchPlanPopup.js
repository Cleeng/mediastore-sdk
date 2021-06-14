"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureSwitchPlanPopup = void 0;

var _regenerator = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _api = require("api");

var _Button = _interopRequireDefault(require("components/Button"));

var _InnerPopupWrapper = _interopRequireDefault(require("components/InnerPopupWrapper"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _planHelper = require("util/planHelper");

var _checkmark = _interopRequireDefault(require("assets/images/checkmark.svg"));

var _InnerPopupWrapperStyled = require("components/InnerPopupWrapper/InnerPopupWrapperStyled");

var _SwitchPlanPopupStyled = require("./SwitchPlanPopupStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SwitchPlanPopup = function SwitchPlanPopup(_ref) {
  var toOffer = _ref.toOffer,
      fromOffer = _ref.fromOffer,
      hideInnerPopup = _ref.hideInnerPopup,
      updateList = _ref.updateList,
      t = _ref.t;

  var _useState = (0, _react.useState)(1),
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
                setIsLoading(false);
                setStep(2);
              } else {
                setError(true);
                setIsLoading(false);
              }

              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              setError(true);
              setIsLoading(false);

            case 12:
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

  return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
    steps: 2,
    popupTitle: t('Change Plan'),
    isError: isError,
    currentStep: step
  }, step === 1 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.ImageWrapper, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.SubscriptionIconStyled, {
    period: fromOffer.period,
    showLabel: "Current"
  }), /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.ArrowStyled, null), /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.SubscriptionIconStyled, {
    period: toOffer.period,
    showLabel: "New"
  })), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, {
    step: step
  }, t(toOffer.switchDirection)), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, {
    step: step,
    dangerouslySetInnerHTML: {
      __html: "".concat(t("You are about to change your plan from <b>\n                  ".concat(fromOffer.offerTitle, "</b> to <b> \n                  ").concat(toOffer.title, " </b>. You will be charged the new price <b>\n                  ").concat(toOffer.nextPaymentPrice).concat(toOffer.nextPaymentPriceCurrencySymbol, " \n                  </b> on your next billing date <b>\n                  ").concat((0, _planHelper.dateFormat)(fromOffer.expiresAt), "</b>.")), "\n                  <br />\n                  ").concat(toOffer.couponNotApplicable ? "<br />\n                    ".concat(t('Your current coupon will not apply to the new plan. If you have a coupon for your new plan, you can apply it after confirming your switch.'), " <br />") : '', "\n                  <br /> ").concat(t('Do you want to apply the change now?'))
    }
  })), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
    removeMargin: true
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    onClickFn: hideInnerPopup
  }, t('Keep Current Plan')), /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "confirm",
    onClickFn: changePlan
  }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) : t("Change Plan")))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.ImageWrapper, null, /*#__PURE__*/_react.default.createElement(_SwitchPlanPopupStyled.ImageStyled, {
    src: _checkmark.default,
    alt: "checkmark icon"
  })), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, {
    step: step
  }, t('Thank you')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, {
    step: step
  }, t('You have successfully changed your plan. Your new fee will be '), /*#__PURE__*/_react.default.createElement("strong", null, toOffer.nextPaymentPrice, toOffer.nextPaymentPriceCurrencySymbol), ' ', t('starting from '), /*#__PURE__*/_react.default.createElement("strong", null, " ", (0, _planHelper.dateFormat)(fromOffer.expiresAt)), ".")), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "confirm",
    onClickFn: closePopupAndRefresh
  }, t('Back to settings')))));
};

exports.PureSwitchPlanPopup = SwitchPlanPopup;
SwitchPlanPopup.defaultProps = {
  toOffer: {},
  fromOffer: {},
  hideInnerPopup: function hideInnerPopup() {},
  updateList: function updateList() {},
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(SwitchPlanPopup));

exports.default = _default;