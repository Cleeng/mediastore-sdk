"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _Footer = _interopRequireDefault(require("./Footer"));

require("styles/index.scss");

(0, _react2.storiesOf)('Checkout/Footer', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '600px',
      height: '36px',
      background: '#ffffff',
      position: 'relative'
    }
  }, story());
}).add('Default', function () {
  return /*#__PURE__*/_react.default.createElement(_Footer.default, null);
});