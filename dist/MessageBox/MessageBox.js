"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _success = require("assets/images/success.svg");

var _MessageBoxStyled = require("./MessageBoxStyled");

var MessageBox = function MessageBox(_ref) {
  var type = _ref.type,
      message = _ref.message;
  return /*#__PURE__*/_react.default.createElement(_MessageBoxStyled.MessageBoxStyled, {
    type: type
  }, /*#__PURE__*/_react.default.createElement(_MessageBoxStyled.MessageBoxIconWrapStyled, null, _success.ReactComponent && /*#__PURE__*/_react.default.createElement(_success.ReactComponent, null)), /*#__PURE__*/_react.default.createElement(_MessageBoxStyled.MessageBoxMessageStyled, null, message));
};

MessageBox.defaultProps = {
  type: 'success',
  message: ''
};
var _default = MessageBox;
exports.default = _default;