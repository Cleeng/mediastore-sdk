"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _UpdateSubscription = require("./UpdateSubscription");

var showStory = false;

if (showStory) {
  (0, _react2.storiesOf)('MyAccount/PlanDetails/UpdateSubscription', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(function (story) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: 600,
        backgroundColor: 'white',
        padding: 20,
        position: 'relative'
      }
    }, story());
  }).add('Unsubscribe', function () {
    return /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
      action: "unsubscribe",
      updateList: function updateList() {},
      offerDetails: {
        offerId: 'S568296139_ZW',
        status: 'active',
        expiresAt: 1615897260,
        nextPaymentPrice: 22.15,
        nextPaymentCurrency: 'EUR',
        paymentGateway: 'adyen',
        paymentMethod: 'card',
        offerTitle: 'Annual subscription to Sport TV',
        period: 'year',
        totalPrice: 90
      },
      hideInnerPopup: function hideInnerPopup() {}
    });
  }).add('Resubscribe', function () {
    return /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
      action: "resubscribe",
      updateList: function updateList() {},
      hideInnerPopup: function hideInnerPopup() {},
      offerDetails: {
        offerId: 'S568296139_ZW',
        status: 'cancelled',
        expiresAt: 1615897260,
        nextPaymentPrice: 22.15,
        nextPaymentCurrency: 'EUR',
        paymentGateway: 'adyen',
        paymentMethod: 'card',
        offerTitle: 'Annual subscription to Sport TV',
        period: 'year',
        totalPrice: 90
      }
    });
  });
}