"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureCurrentPlan = exports.SkeletonCard = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _sad_coupon = require("assets/images/errors/sad_coupon.svg");

var _planHelper = require("util/planHelper");

var _MyAccountError = _interopRequireDefault(require("components/MyAccountError"));

var _SubscriptionCard = _interopRequireDefault(require("components/SubscriptionCard"));

var _SubscriptionManagement = _interopRequireDefault(require("components/SubscriptionManagement"));

var _CouponInput = _interopRequireDefault(require("components/CouponInput"));

var _MessageBox = _interopRequireDefault(require("components/MessageBox"));

var _api = require("api");

var _CurrentPlanStyled = require("./CurrentPlanStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-nested-ternary */
var SkeletonCard = function SkeletonCard() {
  return /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionStyled, null, /*#__PURE__*/_react.default.createElement(_SubscriptionCard.default, {
    isDataLoaded: false
  }));
};

exports.SkeletonCard = SkeletonCard;

var CurrentPlan = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2.default)(CurrentPlan, _PureComponent);

  var _super = (0, _createSuper2.default)(CurrentPlan);

  function CurrentPlan(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CurrentPlan);
    _this = _super.call(this, props);

    _this.submitCoupon = function (subscriptionId) {
      var _this$props = _this.props,
          t = _this$props.t,
          updateList = _this$props.updateList;
      var couponValue = _this.state.couponValue;

      _this.resetErrorMessage();

      if (couponValue) {
        _this.setState({
          isSubmitting: true
        });

        (0, _api.applyCoupon)(subscriptionId, couponValue).then(function (resp) {
          switch (resp.status) {
            case 200:
              _this.showMessageBox('success', t('Your Coupon has been successfully reedemed.'), subscriptionId);

              _this.setState({
                isCouponInputOpened: false,
                isSubmitting: false
              });

              updateList();
              break;

            case 422:
              if (resp.errors.some(function (e) {
                return e.includes('not found');
              })) _this.showErrorMessage(t('Invalid coupon code.'));
              if (resp.errors.some(function (e) {
                return e.includes('already');
              })) _this.showErrorMessage(t('Coupon already used'));

              _this.setState({
                isSubmitting: false
              });

              break;

            default:
              _this.showErrorMessage(t('Invalid coupon code.'));

              _this.setState({
                isSubmitting: false
              });

              break;
          }
        }).catch(function () {
          _this.showErrorMessage('Ooops. Something went wrong.');

          _this.setState({
            isSubmitting: false
          });
        });
      } else {
        _this.showErrorMessage(t('Please enter coupon code.'));
      }
    };

    _this.onInputToggle = function () {
      _this.setState({
        isCouponInputOpened: true
      });
    };

    _this.resetErrorMessage = function () {
      _this.setState({
        isErrorMessageShown: false
      });
    };

    _this.showErrorMessage = function (message) {
      _this.setState({
        isErrorMessageShown: true,
        errorMessage: message
      });
    };

    _this.showMessageBox = function (type, text, subscriptionId) {
      _this.setState({
        messageBoxType: type,
        messageBoxText: text,
        isMessageBoxOpened: true,
        messageSubscriptionId: subscriptionId
      });
    };

    _this.state = {
      isMessageBoxOpened: false,
      messageBoxType: null,
      messageBoxText: '',
      isErrorMessageShown: false,
      errorMessage: '',
      isCouponInputOpened: false,
      couponValue: '',
      isSubmitting: false,
      messageSubscriptionId: null
    };
    return _this;
  }

  (0, _createClass2.default)(CurrentPlan, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isMessageBoxOpened = _this$state.isMessageBoxOpened,
          isCouponInputOpened = _this$state.isCouponInputOpened,
          isErrorMessageShown = _this$state.isErrorMessageShown,
          messageBoxType = _this$state.messageBoxType,
          messageBoxText = _this$state.messageBoxText,
          errorMessage = _this$state.errorMessage,
          couponValue = _this$state.couponValue,
          isSubmitting = _this$state.isSubmitting,
          messageSubscriptionId = _this$state.messageSubscriptionId;
      var _this$props2 = this.props,
          subscriptions = _this$props2.subscriptions,
          isLoading = _this$props2.isLoading,
          errors = _this$props2.errors,
          showInnerPopup = _this$props2.showInnerPopup,
          setOfferToSwitch = _this$props2.setOfferToSwitch,
          offerToSwitch = _this$props2.offerToSwitch,
          isManagementBarOpen = _this$props2.isManagementBarOpen,
          t = _this$props2.t;
      var areFewOffers = subscriptions.length > 1;
      return isLoading ? /*#__PURE__*/_react.default.createElement(SkeletonCard, null) : /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.WrapStyled, null, errors.length !== 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
        generalError: true
      }) : subscriptions.length === 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
        title: t('No subscriptions yet!'),
        subtitle: t('If you choose your plan, you will be able to manage your Subscriptions here.'),
        icon: _sad_coupon.ReactComponent
      }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, subscriptions.map(function (subItem) {
        var description = "".concat(subItem.status === 'active' ? t('Next payment is on') : t('This plan will expire on'), " ").concat((0, _planHelper.dateFormat)(subItem.expiresAt));
        return /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionStyled, {
          key: subItem.offerId,
          onClick: function onClick() {
            if (areFewOffers && subItem.status === 'active') setOfferToSwitch(subItem);
          },
          cursorPointer: areFewOffers && subItem.status === 'active',
          isSelected: areFewOffers && offerToSwitch.offerId === subItem.offerId
        }, /*#__PURE__*/_react.default.createElement(_SubscriptionCard.default, {
          period: subItem.period,
          title: subItem.offerTitle,
          description: description,
          currency: _planHelper.currencyFormat[subItem.nextPaymentCurrency],
          price: subItem.nextPaymentPrice
        }), isMessageBoxOpened && messageSubscriptionId === subItem.subsctiptionId && /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.StatusMessageWrapStyled, null, /*#__PURE__*/_react.default.createElement(_MessageBox.default, {
          type: messageBoxType,
          message: messageBoxText
        })), /*#__PURE__*/_react.default.createElement(_SubscriptionManagement.default, {
          isOpened: isManagementBarOpen,
          onClose: function onClose() {
            return _this2.setState({
              isCouponInputOpened: false
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionActionsStyled, null, subItem.status === 'active' && !isCouponInputOpened && /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SimpleButtonStyled, {
          theme: "simple",
          onClickFn: function onClickFn(event) {
            event.stopPropagation();
            showInnerPopup({
              type: 'updateSubscription',
              data: {
                action: 'unsubscribe',
                offerData: {
                  offerId: subItem.offerId,
                  expiresAt: subItem.expiresAt
                }
              }
            });
          }
        }, t('Unsubscribe')), subItem.status === 'cancelled' && !isCouponInputOpened && /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.FullWidthButtonStyled, {
          theme: "simple",
          onClickFn: function onClickFn(event) {
            event.stopPropagation();
            showInnerPopup({
              type: 'updateSubscription',
              data: {
                action: 'resubscribe',
                offerData: {
                  offerId: subItem.offerId,
                  expiresAt: subItem.expiresAt,
                  price: "".concat(subItem.nextPaymentPrice).concat(_planHelper.currencyFormat[subItem.nextPaymentCurrency])
                }
              }
            });
          }
        }, t('Resume')), subItem.status !== 'cancelled' && /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.CouponWrapStyled, null, /*#__PURE__*/_react.default.createElement(_CouponInput.default, {
          fullWidth: true,
          showMessage: isErrorMessageShown,
          value: couponValue,
          message: errorMessage,
          couponLoading: isSubmitting,
          onSubmit: function onSubmit() {
            return _this2.submitCoupon(subItem.subscriptionId);
          },
          onChange: function onChange(e) {
            return _this2.setState({
              couponValue: e
            });
          },
          onClose: function onClose() {
            return _this2.setState({
              isCouponInputOpened: false
            });
          },
          onInputToggle: function onInputToggle() {
            return _this2.onInputToggle();
          }
        })))));
      })));
    }
  }]);
  return CurrentPlan;
}(_react.PureComponent);

exports.PureCurrentPlan = CurrentPlan;
CurrentPlan.defaultProps = {
  subscriptions: [],
  isLoading: false,
  errors: [],
  offerToSwitch: {},
  isManagementBarOpen: false,
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(CurrentPlan));

exports.default = _default;