"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _storybookAddonMock = _interopRequireDefault(require("storybook-addon-mock"));

var _Payment = _interopRequireDefault(require("./Payment"));

require("styles/index.scss");

(0, _react2.storiesOf)('Checkout/Payment', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_storybookAddonMock.default).add('Basic Payment', function () {
  return /*#__PURE__*/_react.default.createElement(_Payment.default, {
    onPaymentComplete: function onPaymentComplete() {}
  });
}, {
  mockData: [{
    url: "".concat(ENVIRONMENT_CONFIGURATION.API_URL, "/payment-methods"),
    method: 'GET',
    status: 200,
    response: {
      responseData: {
        paymentMethods: [{
          id: 881885683,
          methodName: 'card',
          logoUrl: ''
        }, {
          id: 386925084,
          methodName: 'paypal',
          logoUrl: ''
        }],
        message: 'Payment method settings for publisher 105664357',
        status: 200
      },
      errors: []
    }
  }]
});