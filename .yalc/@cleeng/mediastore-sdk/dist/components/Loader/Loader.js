"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _LoaderStyled = require("./LoaderStyled");
var Loader = function Loader(_ref) {
  var buttonLoader = _ref.buttonLoader,
    smallLoader = _ref.smallLoader,
    centered = _ref.centered,
    color = _ref.color,
    isMyAccount = _ref.isMyAccount;
  return /*#__PURE__*/_react.default.createElement(_LoaderStyled.LoaderStyled, {
    buttonLoader: buttonLoader,
    smallLoader: smallLoader,
    centered: centered,
    color: color,
    isMyAccount: isMyAccount
  }, /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null), /*#__PURE__*/_react.default.createElement("div", null));
};
Loader.propTypes = {
  buttonLoader: _propTypes.default.bool,
  smallLoader: _propTypes.default.bool,
  centered: _propTypes.default.bool,
  color: _propTypes.default.string,
  isMyAccount: _propTypes.default.bool
};
Loader.defaultProps = {
  buttonLoader: false,
  smallLoader: false,
  centered: false,
  color: null,
  isMyAccount: false
};
var _default = Loader;
exports.default = _default;