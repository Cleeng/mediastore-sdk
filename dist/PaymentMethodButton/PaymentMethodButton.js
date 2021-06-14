"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _paymentMethodHelper = require("util/paymentMethodHelper");

var _PaymentMethodButtonStyled = require("./PaymentMethodButtonStyled");

var PaymentMethodButton = function PaymentMethodButton(_ref) {
  var methodName = _ref.methodName,
      onClickFn = _ref.onClickFn;
  var LogoComponent = _paymentMethodHelper.logos[methodName];
  return /*#__PURE__*/_react.default.createElement(_PaymentMethodButtonStyled.StyledButton, {
    onClickFn: onClickFn,
    theme: "simple"
  }, LogoComponent ? /*#__PURE__*/_react.default.createElement(LogoComponent, null) : /*#__PURE__*/_react.default.createElement(_PaymentMethodButtonStyled.StyledMethodName, null, methodName));
};

PaymentMethodButton.defaultProps = {
  methodName: '',
  onClickFn: function onClickFn() {}
};
var _default = PaymentMethodButton;
exports.default = _default;