"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _addonActions = require("@storybook/addon-actions");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _storybookState = require("@sambego/storybook-state");

require("styles/index.scss");

var _Input = _interopRequireDefault(require("./Input"));

var wrapperState = new _storybookState.Store({
  value: ''
});
var inputTypes = {
  text: 'text',
  email: 'email',
  password: 'password'
};
(0, _react2.storiesOf)('Checkout/Input', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement(_storybookState.State, {
    store: wrapperState
  }, function (state) {
    return story(state);
  });
}).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 400,
      backgroundColor: 'white',
      padding: '20px 0'
    }
  }, story());
}).add('All options', function (state) {
  return /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: (0, _addonKnobs.select)('type', inputTypes),
    placeholder: (0, _addonKnobs.text)('placeholder', 'Type here...'),
    onSubmit: /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", (0, _addonActions.action)('onSubmit'));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    value: state.value,
    onChange: function onChange(e) {
      return wrapperState.set({
        value: e
      });
    },
    error: (0, _addonKnobs.text)('error', ''),
    showVisibilityIcon: (0, _addonKnobs.boolean)('showVisibilityIcon', false)
  });
});