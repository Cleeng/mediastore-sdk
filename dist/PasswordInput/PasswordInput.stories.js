"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookState = require("@sambego/storybook-state");

var _PasswordInput = _interopRequireDefault(require("./PasswordInput"));

var wrapperState = new _storybookState.Store({
  value: '',
  showPassword: false
});
var ERROR_MESSAGES = {
  noError: '',
  wrongFormat: 'Your password must contain at least 8 characters, including 1 digit.',
  fillField: 'Please fill out this field.'
};
(0, _react2.storiesOf)('Checkout/PasswordInput', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 400,
      backgroundColor: 'white',
      paddingBottom: 20
    }
  }, story());
}).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement(_storybookState.State, {
    store: wrapperState
  }, function (state) {
    return story(state);
  });
}).add('All options', function (state) {
  return /*#__PURE__*/_react.default.createElement(_PasswordInput.default, {
    handleClickShowPassword: function handleClickShowPassword() {
      return wrapperState.set({
        showPassword: !state.showPassword
      });
    },
    error: (0, _addonKnobs.select)('Error message', ERROR_MESSAGES),
    value: state.value,
    onChange: function onChange(e) {
      return wrapperState.set({
        value: e
      });
    },
    showVisibilityIcon: (0, _addonKnobs.boolean)('showVisibilityIcon', true),
    showPassword: state.showPassword || (0, _addonKnobs.boolean)('showPassword', false),
    showPasswordStrength: (0, _addonKnobs.boolean)('showPasswordStrength', false)
  });
});