"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _addonActions = require("@storybook/addon-actions");

var _Adyen = require("./Adyen");

require("styles/index.scss");

(0, _react2.storiesOf)('Checkout/Adyen', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 40
    }
  }, story());
}).add('Default', function () {
  return /*#__PURE__*/_react.default.createElement(_Adyen.PureAdyen, {
    onSubmit: (0, _addonActions.action)('onSubmit')
  });
});