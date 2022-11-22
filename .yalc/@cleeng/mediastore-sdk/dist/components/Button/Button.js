"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BUTTON_THEME = exports.BUTTON_SIZE = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ButtonStyled = _interopRequireDefault(require("./ButtonStyled"));
/* eslint-disable react/jsx-props-no-spreading */

var BUTTON_SIZE = {
  BIG: 'big',
  NORMAL: 'normal'
};
exports.BUTTON_SIZE = BUTTON_SIZE;
var BUTTON_THEME = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SIMPLE: 'simple',
  NAVLINK: 'navLink',
  LINK: 'link',
  PAYMENT: 'payment',
  CONFIRM: 'confirm',
  PAYPAL: 'paypal',
  DANGER: 'danger'
};
exports.BUTTON_THEME = BUTTON_THEME;
var Button = function Button(_ref) {
  var type = _ref.type,
    onClickFn = _ref.onClickFn,
    disabled = _ref.disabled,
    children = _ref.children,
    label = _ref.label,
    size = _ref.size,
    theme = _ref.theme,
    fontSize = _ref.fontSize,
    margin = _ref.margin,
    fontWeight = _ref.fontWeight,
    width = _ref.width,
    icon = _ref.icon,
    padding = _ref.padding,
    className = _ref.className;
  var ButtonProps = {
    type: type,
    onClick: onClickFn
  };
  return /*#__PURE__*/_react.default.createElement(_ButtonStyled.default, (0, _extends2.default)({}, ButtonProps, {
    disabled: disabled,
    "aria-label": label,
    size: size,
    theme: theme,
    fontSize: fontSize,
    margin: margin,
    fontWeight: fontWeight,
    width: width,
    icon: icon,
    padding: padding,
    className: className
  }), children);
};
var _default = Button;
exports.default = _default;
Button.propTypes = {
  size: _propTypes.default.oneOf(Object.values(BUTTON_SIZE)),
  theme: _propTypes.default.oneOf(Object.values(BUTTON_THEME)),
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element, _propTypes.default.node]),
  type: _propTypes.default.string,
  onClickFn: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  label: _propTypes.default.string,
  fontSize: _propTypes.default.string,
  margin: _propTypes.default.string,
  fontWeight: _propTypes.default.string,
  width: _propTypes.default.string,
  icon: _propTypes.default.string,
  padding: _propTypes.default.string,
  className: _propTypes.default.string
};
Button.defaultProps = {
  size: null,
  theme: BUTTON_THEME.PRIMARY,
  children: '',
  type: 'button',
  onClickFn: function onClickFn() {},
  disabled: false,
  label: null,
  fontSize: null,
  margin: null,
  fontWeight: null,
  width: null,
  icon: null,
  padding: null,
  className: ''
};