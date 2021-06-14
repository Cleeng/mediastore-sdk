"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonActions = require("@storybook/addon-actions");

var _storybookReactRouter = _interopRequireDefault(require("storybook-react-router"));

require("styles/index.scss");

var _PasswordResetSuccess = require("./PasswordResetSuccess");

(0, _react2.storiesOf)('Pages/PasswordResetSuccess', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator((0, _storybookReactRouter.default)()).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 700,
      backgroundColor: 'white'
    }
  }, story());
}).add('Default', function () {
  return /*#__PURE__*/_react.default.createElement(_PasswordResetSuccess.PurePasswordResetSuccess, {
    onSuccess: (0, _addonActions.action)('onSuccess'),
    urlProps: {
      location: {
        search: 'http://cleeng.com/'
      }
    },
    email: (0, _addonKnobs.text)('email', 'customer@example.com')
  });
});