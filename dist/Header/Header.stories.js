"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookReactRouter = _interopRequireDefault(require("storybook-react-router"));

require("styles/index.scss");

var _BackButton = require("components/BackButton/BackButton");

var _Header = _interopRequireDefault(require("./Header"));

(0, _react2.storiesOf)('Checkout/Header', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator((0, _storybookReactRouter.default)()).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 600,
      backgroundColor: '#ffffff',
      position: 'relative'
    }
  }, story());
}).add('Default - with logo', function () {
  return /*#__PURE__*/_react.default.createElement(_Header.default, null);
}).add('With back to login button', function () {
  return /*#__PURE__*/_react.default.createElement(_Header.default, null, /*#__PURE__*/_react.default.createElement(_BackButton.PureBackButton, null));
});