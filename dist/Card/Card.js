"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _CardStyled = require("./CardStyled");

var Card = function Card(_ref) {
  var className = _ref.className,
      children = _ref.children,
      withShadow = _ref.withShadow,
      withBorder = _ref.withBorder;
  return /*#__PURE__*/_react.default.createElement(_CardStyled.WrapStyled, {
    withShadow: withShadow,
    className: className,
    withBorder: withBorder
  }, children);
};

var _default = Card;
exports.default = _default;
Card.defaultProps = {
  children: '',
  withShadow: false,
  className: '',
  withBorder: false
};