"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _Loader = _interopRequireDefault(require("./Loader"));

(0, _react2.storiesOf)('Common/Loader', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 200,
      backgroundColor: 'white',
      padding: 20
    }
  }, story());
}).add('Default loader', function () {
  return /*#__PURE__*/_react.default.createElement(_Loader.default, null);
}).add('Button loader', function () {
  return /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true
  });
});