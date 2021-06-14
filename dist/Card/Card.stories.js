"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _Card = _interopRequireDefault(require("./Card"));

(0, _react2.storiesOf)('Common/Card', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 400,
      backgroundColor: '#f8f9fc',
      padding: 20,
      position: 'relative'
    }
  }, story());
}).add('Default', function () {
  return /*#__PURE__*/_react.default.createElement(_Card.default, {
    withShadow: (0, _addonKnobs.boolean)('withShadow', false)
  }, "Default Card");
});