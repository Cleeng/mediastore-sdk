"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _PaymentMethod = require("./PaymentMethod");

var CARD = [{
  id: 680860225,
  customerId: 338816933,
  token: '8315815183716450',
  paymentGateway: 'adyen',
  paymentMethod: 'card',
  paymentMethodSpecificParams: {
    variant: 'mc',
    lastCardFourDigits: '1111',
    holderName: 'Sample card',
    cardExpirationDate: '10/2020',
    socialSecurityNumber: ''
  },
  paymentMethodId: null
}];
var PAYPAL = [{
  id: 666324682,
  customerId: 819605670,
  token: 'B-0NL91937JD123950W',
  paymentGateway: 'paypal',
  paymentMethod: 'paypal',
  paymentMethodSpecificParams: {
    payerId: 'D3RFTM8JLUTZQ',
    holderName: 'User  Name'
  },
  paymentMethodId: 996126615,
  active: true
}];
(0, _react2.storiesOf)('MyAccount/PaymentInfo/PaymentMethod', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 400,
      backgroundColor: 'white',
      padding: 20,
      position: 'relative'
    }
  }, story());
}).add('Card', function () {
  return /*#__PURE__*/_react.default.createElement(_PaymentMethod.PurePaymentMethod, {
    paymentDetails: CARD
  });
}).add('PayPal', function () {
  return /*#__PURE__*/_react.default.createElement(_PaymentMethod.PurePaymentMethod, {
    paymentDetails: PAYPAL
  });
});