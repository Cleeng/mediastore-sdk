"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureSubscriptionManagement = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Button = _interopRequireDefault(require("../Button"));
var _planHelper = require("../../util/planHelper");
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _api = require("../../api");
var _CouponInput = _interopRequireDefault(require("../CouponInput"));
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _SubscriptionManagementStyled = require("./SubscriptionManagementStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SubscriptionManagement = function SubscriptionManagement(_ref) {
  var subscription = _ref.subscription,
    updateList = _ref.updateList,
    showInnerPopup = _ref.showInnerPopup,
    showMessageBox = _ref.showMessageBox,
    setOfferToSwitch = _ref.setOfferToSwitch,
    t = _ref.t;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isOptionsVisible = _useState2[0],
    setIsOptionsVisible = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isCouponInputOpened = _useState4[0],
    setIsCouponInputOpened = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    isError = _useState6[0],
    setIsError = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    errorMsg = _useState8[0],
    setErrorMsg = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    isLoading = _useState10[0],
    setIsLoading = _useState10[1];
  var _useState11 = (0, _react.useState)(''),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    couponValue = _useState12[0],
    setCouponValue = _useState12[1];
  var submitCoupon = function submitCoupon(subscriptionId) {
    if (couponValue) {
      setIsLoading(true);
      (0, _api.applyCoupon)(subscriptionId, couponValue).then(function (resp) {
        switch (resp.status) {
          case 200:
            setIsCouponInputOpened(false);
            setIsLoading(false);
            updateList();
            showMessageBox('success', t('Your Coupon has been successfully reedemed.'), subscriptionId);
            window.dispatchEvent(new CustomEvent('MSSDK:redeem-coupon-success', {
              detail: {
                coupon: couponValue,
                source: 'myaccount'
              }
            }));
            break;
          case 422:
            if (resp.errors.some(function (e) {
              return e.includes('not found');
            })) setErrorMsg('Invalid coupon code.');
            if (resp.errors.some(function (e) {
              return e.includes('already');
            })) setErrorMsg('Coupon already used');
            setIsError(true);
            setIsLoading(false);
            window.dispatchEvent(new CustomEvent('MSSDK:redeem-coupon-failed', {
              detail: {
                coupon: couponValue,
                source: 'myaccount'
              }
            }));
            break;
          default:
            setErrorMsg('Invalid coupon code.');
            setIsError(true);
            setIsLoading(false);
            break;
        }
      }).catch(function () {
        window.dispatchEvent(new CustomEvent('MSSDK:redeem-coupon-failed', {
          detail: {
            coupon: couponValue,
            source: 'myaccount'
          }
        }));
        setErrorMsg('Ooops. Something went wrong.');
        setIsError(true);
        setIsLoading(false);
      });
    } else {
      setErrorMsg('Please enter coupon code.');
      setIsError(true);
    }
  };
  var toggle = function toggle(e) {
    e.stopPropagation();
    setIsOptionsVisible(function (isVisible) {
      return !isVisible;
    });
  };
  return /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.SubscriptionManagementStyled, null, /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.ManageButtonWrapStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    width: "unset",
    onClickFn: function onClickFn(e) {
      return toggle(e);
    }
  }, /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.ButtonTextStyled, {
    isExpanded: isOptionsVisible
  }, t('Manage')))), /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.SubscriptionActionsStyled, {
    isOpened: isOptionsVisible
  }, /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.WrapperStyled, null, subscription.status === 'active' && !isCouponInputOpened && /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.SimpleButtonStyled, {
    theme: "simple",
    onClickFn: function onClickFn(event) {
      event.stopPropagation();
      setOfferToSwitch(subscription);
      showInnerPopup({
        type: _innerPopupReducer.POPUP_TYPES.updateSubscription,
        data: {
          action: 'unsubscribe',
          offerData: _objectSpread({}, subscription)
        }
      });
      window.dispatchEvent(new CustomEvent('MSSDK:unsubscribe-button-clicked', {
        detail: {
          offerId: subscription.offerId
        }
      }));
    }
  }, t('Unsubscribe')), subscription.status === 'cancelled' && !isCouponInputOpened && /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.FullWidthButtonStyled, {
    theme: "simple",
    onClickFn: function onClickFn(event) {
      event.stopPropagation();
      showInnerPopup({
        type: _innerPopupReducer.POPUP_TYPES.updateSubscription,
        data: {
          action: 'resubscribe',
          offerData: _objectSpread(_objectSpread({}, subscription), {}, {
            price: "".concat(subscription.nextPaymentPrice).concat(_planHelper.currencyFormat[subscription.nextPaymentCurrency])
          })
        }
      });
      window.dispatchEvent(new CustomEvent('MSSDK:resume-button-clicked', {
        detail: {
          offerId: subscription.offerId
        }
      }));
    }
  }, t('Resume')), subscription.status !== 'cancelled' && /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.CouponWrapStyled, null, /*#__PURE__*/_react.default.createElement(_CouponInput.default, {
    fullWidth: true,
    showMessage: isError,
    value: couponValue,
    message: errorMsg,
    couponLoading: isLoading,
    onSubmit: function onSubmit() {
      return submitCoupon(subscription.subscriptionId);
    },
    onChange: function onChange(e) {
      return setCouponValue(e);
    },
    onClose: function onClose() {
      return setIsCouponInputOpened(function (val) {
        return !val;
      });
    },
    onInputToggle: function onInputToggle() {
      return setIsCouponInputOpened(function (val) {
        return !val;
      });
    },
    source: "myaccount"
  })))));
};
exports.PureSubscriptionManagement = SubscriptionManagement;
SubscriptionManagement.propTypes = {
  subscription: _propTypes.default.objectOf(_propTypes.default.any),
  updateList: _propTypes.default.func,
  showInnerPopup: _propTypes.default.func,
  showMessageBox: _propTypes.default.func,
  t: _propTypes.default.func,
  setOfferToSwitch: _propTypes.default.func
};
SubscriptionManagement.defaultProps = {
  subscription: {},
  updateList: function updateList() {},
  showInnerPopup: function showInnerPopup() {},
  showMessageBox: function showMessageBox() {},
  t: function t(k) {
    return k;
  },
  setOfferToSwitch: function setOfferToSwitch() {}
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(SubscriptionManagement));
exports.default = _default;