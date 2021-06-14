"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _ErrorPage = _interopRequireDefault(require("./ErrorPage"));

require("styles/index.scss");

(0, _react2.storiesOf)('Pages/ErrorPage', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 600,
      backgroundColor: 'white'
    }
  }, story());
}).add('All options', function () {
  return /*#__PURE__*/_react.default.createElement(_ErrorPage.default, {
    type: (0, _addonKnobs.select)('Types', ['offerNotExist', 'generalError', 'alreadyHaveAccess', 'cannotPurchase']),
    error: (0, _addonKnobs.text)('Error label', '')
  });
});