"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _HeaderStyled = require("./HeaderStyled");
var Header = function Header(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_HeaderStyled.HeaderStyled, null, /*#__PURE__*/_react.default.createElement(_HeaderStyled.LogoStyled, null), children);
};
Header.propTypes = {
  children: _propTypes.default.node
};
Header.defaultProps = {
  children: null
};
var _default = Header;
exports.default = _default;