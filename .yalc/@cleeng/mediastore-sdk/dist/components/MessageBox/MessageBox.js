"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _MessageBoxStyled = require("./MessageBoxStyled");
var SuccessIcon = function SuccessIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "m9 21.035-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436L24 5.782z"
  }));
};
SuccessIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24"
};
var MessageBox = function MessageBox(_ref) {
  var type = _ref.type,
    message = _ref.message;
  return /*#__PURE__*/_react.default.createElement(_MessageBoxStyled.MessageBoxStyled, {
    type: type
  }, /*#__PURE__*/_react.default.createElement(_MessageBoxStyled.MessageBoxIconWrapStyled, null, SuccessIcon && /*#__PURE__*/_react.default.createElement(SuccessIcon, null)), /*#__PURE__*/_react.default.createElement(_MessageBoxStyled.MessageBoxMessageStyled, null, message));
};
MessageBox.propTypes = {
  type: _propTypes.default.string,
  message: _propTypes.default.string
};
MessageBox.defaultProps = {
  type: 'success',
  message: ''
};
var _default = MessageBox;
exports.default = _default;