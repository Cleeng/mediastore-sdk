"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookAddonMock = _interopRequireDefault(require("storybook-addon-mock"));

var _Consents = _interopRequireDefault(require("./Consents"));

(0, _react2.storiesOf)('Checkout/Consents', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonMock.default).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 400,
      backgroundColor: 'white',
      padding: '20px 20px 50px 20px'
    }
  }, story());
}).add('All options', function () {
  return /*#__PURE__*/_react.default.createElement(_Consents.default, {
    publisherId: "933103327"
  });
}, {
  mockData: [{
    url: "".concat(ENVIRONMENT_CONFIGURATION.API_URL, "/publishers/933103327/consents"),
    method: 'GET',
    status: 200,
    response: {
      responseData: {
        consents: [{
          broadcasterId: 0,
          name: 'terms',
          version: '1',
          value: 'https://cleeng.com/cleeng-user-agreement',
          label: 'I accept the Terms and Conditions of Cleeng',
          required: true
        }, {
          broadcasterId: 100258828,
          name: 'broadcaster_terms',
          version: '10',
          value: 'https://cleeng.com/privacy',
          label: 'I accept Terms and Conditions of Test Company.',
          required: true
        }, {
          broadcasterId: 100258828,
          name: 'broadcaster_marketing',
          version: '9',
          value: 'Notify me about new cool product updates and use cases',
          label: 'Notify me about new cool product updates and use cases',
          required: false
        }]
      },
      errors: []
    }
  }]
});