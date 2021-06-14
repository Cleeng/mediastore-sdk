"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BUTTON_THEME = exports.BUTTON_SIZE = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ButtonStyled = _interopRequireDefault(require("./ButtonStyled"));

/* eslint-disable react/jsx-props-no-spreading */
var BUTTON_SIZE = {
  BIG: 'big'
};
exports.BUTTON_SIZE = BUTTON_SIZE;
var BUTTON_THEME = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SIMPLE: 'simple',
  NAVLINK: 'navLink',
  LINK: 'link',
  PAYMENT: 'payment',
  CONFIRM: 'confirm'
};
exports.BUTTON_THEME = BUTTON_THEME;

var Button = function Button(_ref) {
  var type = _ref.type,
      onClickFn = _ref.onClickFn,
      disabled = _ref.disabled,
      children = _ref.children,
      isLink = _ref.isLink,
      to = _ref.to,
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
  var LinkProps = {
    as: _reactRouterDom.Link,
    to: {
      pathname: to.pathname,
      state: {
        fromMyAccount: to.fromMyAccount
      }
    }
  };
  var ButtonProps = {
    type: type,
    onClick: onClickFn
  };
  return /*#__PURE__*/_react.default.createElement(_ButtonStyled.default, Object.assign({}, isLink ? LinkProps : ButtonProps, {
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
Button.defaultProps = {
  size: null,
  theme: BUTTON_THEME.PRIMARY,
  children: '',
  type: 'button',
  onClickFn: function onClickFn() {},
  disabled: false,
  isLink: false,
  to: {
    pathname: '',
    state: {
      fromMyAccount: false
    }
  },
  label: null,
  fontSize: null,
  margin: null,
  fontWeight: null,
  width: null,
  icon: null,
  padding: null,
  className: ''
};