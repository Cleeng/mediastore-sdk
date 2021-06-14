"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

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

Loader.defaultProps = {
  buttonLoader: false,
  smallLoader: false,
  centered: false,
  color: null,
  isMyAccount: false
};
var _default = Loader;
exports.default = _default;