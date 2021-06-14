"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonKnobs = require("@storybook/addon-knobs");

var _google = _interopRequireDefault(require("assets/images/google.png"));

var _Button = _interopRequireDefault(require("./Button"));

(0, _react2.storiesOf)('Common/Button', module).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(_addonKnobs.withKnobs).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 400,
      backgroundColor: 'white',
      padding: 20,
      position: 'relative'
    }
  }, story());
}).add('All options', function () {
  return /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: (0, _addonKnobs.select)('theme', ['primary', 'secondary', 'simple', 'navLink', 'link']),
    size: (0, _addonKnobs.select)('size', ['big']),
    fontSize: (0, _addonKnobs.text)('fontSize'),
    margin: (0, _addonKnobs.text)('margin'),
    fontWeight: (0, _addonKnobs.text)('fontWeight'),
    width: (0, _addonKnobs.text)('width'),
    disabled: (0, _addonKnobs.boolean)('disabled'),
    icon: (0, _addonKnobs.select)('icon', [null, _google.default])
  }, "Sample button");
});