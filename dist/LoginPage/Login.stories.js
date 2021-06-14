"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _storybookReactRouter = _interopRequireDefault(require("storybook-react-router"));

var _Login = require("./Login");

require("styles/index.scss");

(0, _react2.storiesOf)('Pages/LoginPage', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator((0, _storybookReactRouter.default)()).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 700,
      backgroundColor: 'white',
      position: 'relative'
    }
  }, story());
}).add('Checkout and My account login', function () {
  return /*#__PURE__*/_react.default.createElement(_Login.PureLogin, {
    urlProps: {
      location: {
        search: 'http://cleeng.com/'
      }
    },
    isMyAccount: (0, _addonKnobs.boolean)('isMyAccount', false)
  });
});