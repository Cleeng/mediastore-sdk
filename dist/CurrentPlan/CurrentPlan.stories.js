"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _CurrentPlan = require("./CurrentPlan");

var SUBSCRIPTIONMOCK = [{
  offerId: 'S582933870_ZW',
  status: 'active',
  expiresAt: 1587035728,
  nextPaymentPrice: 2.7,
  nextPaymentCurrency: 'EUR',
  paymentGateway: 'adyen',
  paymentMethod: 'card',
  offerTitle: 'Monthly subscription to pride&prejudice',
  period: 'month'
}];
var showStory = false;

if (showStory) {
  (0, _react2.storiesOf)('MyAccount/PlanDetails/CurrentPlan', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(function (story) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: 600,
        backgroundColor: 'white',
        padding: 20,
        position: 'relative'
      }
    }, story());
  }).add('Active subscription', function () {
    return /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
      subscriptions: SUBSCRIPTIONMOCK,
      isLoading: (0, _addonKnobs.boolean)('isLoading', false),
      setOfferToSwitch: function setOfferToSwitch() {},
      showInnerPopup: function showInnerPopup() {}
    });
  }).add('No subscription', function () {
    return /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
      subscriptions: [],
      isLoading: false,
      setOfferToSwitch: function setOfferToSwitch() {},
      showInnerPopup: function showInnerPopup() {}
    });
  });
}