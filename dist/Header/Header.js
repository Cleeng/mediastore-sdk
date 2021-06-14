"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _layoutHelper = require("util/layoutHelper");

var _HeaderStyled = require("./HeaderStyled");

var _logo = _interopRequireDefault(require("./img/logo.png"));

var Header = function Header(_ref) {
  var withoutLogo = _ref.withoutLogo,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_HeaderStyled.HeaderStyled, {
    switchOff: (0, _layoutHelper.isHeaderOff)()
  }, !withoutLogo && /*#__PURE__*/_react.default.createElement(_HeaderStyled.LogoStyled, {
    logoSrc: _logo.default
  }), children);
};

Header.defaultProps = {
  withoutLogo: false,
  children: null
};
var _default = Header;
exports.default = _default;