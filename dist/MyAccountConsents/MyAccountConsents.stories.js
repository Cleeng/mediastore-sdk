"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _MyAccountConsents = require("./MyAccountConsents");

(0, _react2.storiesOf)('MyAccount/UpdateProfile/Consents', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 400,
      backgroundColor: 'white',
      padding: 20,
      position: 'relative'
    }
  }, story());
}).add('Default', function () {
  return /*#__PURE__*/_react.default.createElement(_MyAccountConsents.PureMyAccountConsents, {
    setConsents: function setConsents() {},
    consents: [{
      customerId: '338816933',
      name: 'broadcaster_marketing',
      required: false,
      state: 'declined',
      version: '2',
      needsUpdate: false,
      label: 'I accept the Terms and Conditions of Cleeng',
      value: 'I accept the Terms and Conditions of Cleeng',
      newestVersion: '2',
      date: 1588942073
    }, {
      customerId: '338816933',
      name: 'broadcaster_terms',
      required: true,
      state: 'accepted',
      version: '3',
      needsUpdate: false,
      label: 'I accept Terms and Conditions of Test Company.',
      value: 'https://cleeng.com/privacy',
      newestVersion: '3',
      date: 1588942073
    }, {
      customerId: '338816933',
      name: 'terms',
      required: true,
      state: 'accepted',
      version: '1',
      needsUpdate: false,
      label: 'Notify me about new cool product updates and use cases',
      value: 'https://cleeng.com/cleeng-user-agreement',
      newestVersion: '1',
      date: 1588942073
    }]
  });
});