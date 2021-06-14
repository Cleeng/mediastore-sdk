"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureSubscriptionSwitchesList = void 0;

var _objectSpread2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _CurrentPlanStyled = require("components/CurrentPlan/CurrentPlanStyled");

var _SubscriptionCard = _interopRequireDefault(require("components/SubscriptionCard"));

var _MyAccountError = _interopRequireDefault(require("components/MyAccountError"));

var _selectPlan = require("assets/images/selectPlan.svg");

var _CurrentPlan = require("components/CurrentPlan/CurrentPlan");

var _helper = _interopRequireDefault(require("./helper"));

/* eslint-disable no-nested-ternary */
var SubscriptionSwitchesList = function SubscriptionSwitchesList(_ref) {
  var switchSettings = _ref.switchSettings,
      showInnerPopup = _ref.showInnerPopup,
      isOfferSelected = _ref.isOfferSelected,
      isLoading = _ref.isLoading,
      errors = _ref.errors,
      t = _ref.t;

  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement(_CurrentPlan.SkeletonCard, null);
  }

  if (errors.length) {
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      generalError: true
    });
  }

  if (!isOfferSelected) {
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      icon: _selectPlan.ReactComponent,
      title: t('Start by selecting the plan that would like to switch from'),
      margin: "0 auto"
    });
  }

  var areAvailable = !!(switchSettings.available && switchSettings.available.length);
  var areUnAvailable = !!(switchSettings.unavailable && switchSettings.unavailable.length);
  var allSwitchesBlocked = switchSettings.unavailableReason;

  if (allSwitchesBlocked) {
    var error = _helper.default[allSwitchesBlocked.code] ? _helper.default[allSwitchesBlocked.code] : _helper.default.DEFAULT;
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      icon: error.icon,
      title: error.title,
      subtitle: error.subtitle,
      margin: "0 auto",
      fullWidth: true
    });
  }

  if (!areAvailable && !areUnAvailable) {
    return /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
      icon: _selectPlan.ReactComponent,
      title: t("Looks like there aren't any options for switching from your current plan right now"),
      margin: "0 auto"
    });
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, areAvailable && switchSettings.available.map(function (subItem) {
    return /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionStyled, {
      key: subItem.toOfferId
    }, /*#__PURE__*/_react.default.createElement(_SubscriptionCard.default, {
      period: subItem.period,
      title: subItem.title,
      currency: subItem.nextPaymentPriceCurrencySymbol,
      price: Math.round(subItem.nextPaymentPrice * 100) / 100
    }), /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionActionsStyled, null, /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SimpleButtonStyled, {
      onClickFn: function onClickFn() {
        showInnerPopup({
          type: 'switchPlan',
          data: {
            offerData: (0, _objectSpread2.default)({}, subItem)
          }
        });
      }
    }, t('Choose'))));
  }), areUnAvailable && switchSettings.unavailable.map(function (subItem) {
    return /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionStyled, {
      key: subItem.toOfferId
    }, /*#__PURE__*/_react.default.createElement(_SubscriptionCard.default, {
      period: subItem.period,
      title: subItem.title,
      currency: subItem.nextPaymentPriceCurrencySymbol,
      price: Math.round(subItem.nextPaymentPrice * 100) / 100,
      showInfoBox: subItem.reason.code
    }), /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionActionsStyled, null, /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SimpleButtonStyled, {
      disabled: true
    }, t('Choose'))));
  }));
};

exports.PureSubscriptionSwitchesList = SubscriptionSwitchesList;
SubscriptionSwitchesList.defaultProps = {
  switchSettings: {},
  showInnerPopup: function showInnerPopup() {},
  errors: [],
  isLoading: false,
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(SubscriptionSwitchesList));

exports.default = _default;