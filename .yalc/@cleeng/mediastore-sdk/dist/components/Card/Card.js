"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
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
Card.propTypes = {
  children: _propTypes.default.node,
  withShadow: _propTypes.default.bool,
  className: _propTypes.default.string,
  withBorder: _propTypes.default.bool
};
Card.defaultProps = {
  children: '',
  withShadow: false,
  className: '',
  withBorder: false
};