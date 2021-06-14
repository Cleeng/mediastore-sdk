"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

(0, _react2.storiesOf)('Common/Checkbox', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 400,
      backgroundColor: 'white',
      padding: 20,
      position: 'relative'
    }
  }, story());
}).add('All options', function () {
  return /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
    checked: (0, _addonKnobs.boolean)('checked', false),
    error: (0, _addonKnobs.text)('consents error', 'Please agree on all consents to use this service'),
    required: (0, _addonKnobs.boolean)('required', false)
  }, (0, _addonKnobs.text)('checkbox label', 'I accept the Terms and Conditions of Cleeng'));
});