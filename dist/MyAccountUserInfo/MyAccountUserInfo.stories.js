"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _MyAccountUserInfo = _interopRequireDefault(require("./MyAccountUserInfo"));

(0, _react2.storiesOf)('MyAccount/MyAccountUserInfo', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 400,
      backgroundColor: 'white',
      padding: 20,
      position: 'relative'
    }
  }, story());
}).add('Default', function () {
  return /*#__PURE__*/_react.default.createElement(_MyAccountUserInfo.default, {
    firstName: (0, _addonKnobs.text)('First name', 'John'),
    lastName: (0, _addonKnobs.text)('Last name', 'Doe'),
    email: (0, _addonKnobs.text)('Email', 'johndoe@example.com'),
    subscription: (0, _addonKnobs.text)('Subscription', 'Example subscription name')
  });
});