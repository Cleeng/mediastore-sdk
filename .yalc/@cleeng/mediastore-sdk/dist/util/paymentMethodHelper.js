"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logos = exports.default = exports.areProvidedPaymentMethodIdsValid = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _react = _interopRequireDefault(require("react"));
var CardLogo = function CardLogo(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M0 19.893a2.388 2.388 0 0 0 2.387 2.387h23.872a2.388 2.388 0 0 0 2.387-2.387V11.14H0Zm9.549-3.382a.6.6 0 0 1 .6-.6h6.764a.6.6 0 0 1 .6.6V18.5a.6.6 0 0 1-.6.6h-6.768a.6.6 0 0 1-.6-.6Zm-6.366 0a.6.6 0 0 1 .6-.6H7.36a.6.6 0 0 1 .6.6V18.5a.6.6 0 0 1-.6.6H3.78a.6.6 0 0 1-.6-.6ZM28.646 2.387v2.387H0V2.387A2.388 2.388 0 0 1 2.387 0h23.872a2.388 2.388 0 0 1 2.387 2.387Z",
    fill: "#bcc3cd"
  }));
};
CardLogo.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "28.646",
  height: "22.28"
};
var PaypalLogo = function PaypalLogo(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", {
    style: {
      isolation: "isolate"
    },
    fill: "#bcc3cd"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M57.829 8.893h-2.114a.61.61 0 0 0-.5.268l-2.916 4.294-1.242-4.126a.611.611 0 0 0-.585-.435h-2.076a.366.366 0 0 0-.347.484l2.328 6.831-2.189 3.089a.366.366 0 0 0 .3.578H50.6a.614.614 0 0 0 .5-.262l7.029-10.146a.366.366 0 0 0-.3-.575Zm-14.131 4.094a2.345 2.345 0 0 1-2.374 2.008 1.63 1.63 0 0 1-1.742-2.045 2.353 2.353 0 0 1 2.357-2.023 1.771 1.771 0 0 1 1.4.573 1.811 1.811 0 0 1 .357 1.487Zm2.931-4.093h-2.1a.366.366 0 0 0-.362.309l-.092.587-.147-.213a3 3 0 0 0-2.485-.882 4.836 4.836 0 0 0-4.694 4.231 3.968 3.968 0 0 0 .783 3.231 3.29 3.29 0 0 0 2.648 1.069 4.026 4.026 0 0 0 2.912-1.2l-.094.584a.366.366 0 0 0 .362.423h1.894a.61.61 0 0 0 .6-.515l1.137-7.2a.366.366 0 0 0-.362-.422Zm-12.62.05c-.24 1.576-1.444 1.576-2.608 1.576h-.663l.465-2.941a.365.365 0 0 1 .361-.309h.3c.793 0 1.541 0 1.928.451a1.466 1.466 0 0 1 .213 1.225Zm-.506-4.113h-4.392a.61.61 0 0 0-.6.515l-1.779 11.261a.366.366 0 0 0 .361.423h2.1a.61.61 0 0 0 .6-.515l.48-3.036a.61.61 0 0 1 .6-.515h1.392c2.893 0 4.563-1.4 5-4.175a3.381 3.381 0 0 0-.56-2.834 4.071 4.071 0 0 0-3.2-1.122Zm46.928.309-1.8 11.467a.366.366 0 0 0 .361.423h1.813a.609.609 0 0 0 .6-.515l1.777-11.261a.366.366 0 0 0-.362-.423h-2.027a.366.366 0 0 0-.362.309Zm-5.409 7.847a2.345 2.345 0 0 1-2.374 2.008 1.63 1.63 0 0 1-1.742-2.045 2.353 2.353 0 0 1 2.357-2.023 1.771 1.771 0 0 1 1.4.573 1.811 1.811 0 0 1 .357 1.487Zm2.935-4.094h-2.1a.366.366 0 0 0-.362.309l-.092.588-.147-.213a2.994 2.994 0 0 0-2.484-.882 4.836 4.836 0 0 0-4.694 4.231 3.968 3.968 0 0 0 .783 3.231 3.29 3.29 0 0 0 2.648 1.069 4.026 4.026 0 0 0 2.912-1.2l-.094.584a.366.366 0 0 0 .362.423h1.894a.61.61 0 0 0 .6-.515l1.137-7.2a.366.366 0 0 0-.362-.423Zm-12.62.05c-.24 1.576-1.444 1.576-2.608 1.576h-.672l.465-2.943a.365.365 0 0 1 .361-.309h.3c.793 0 1.541 0 1.928.451a1.469 1.469 0 0 1 .213 1.225Zm-.506-4.113h-4.397a.61.61 0 0 0-.6.515l-1.777 11.262a.366.366 0 0 0 .361.423h2.253a.427.427 0 0 0 .422-.36l.5-3.193a.61.61 0 0 1 .6-.515h1.389c2.893 0 4.563-1.4 5-4.175a3.381 3.381 0 0 0-.56-2.834 4.071 4.071 0 0 0-3.2-1.122Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M6.05 21.519H3.267a.826.826 0 0 1-.839-1.058l.134-.6h1.856A1.431 1.431 0 0 0 5.747 18.8l.954-4.117a1.434 1.434 0 0 1 1.327-1.058h.791q5.1 0 7.926-2.1a6.529 6.529 0 0 0 2.833-5.5 5.266 5.266 0 0 0-.527-2.5c0-.014-.014-.028-.014-.041l.121.067a4.146 4.146 0 0 1 1.534 1.627 5.228 5.228 0 0 1 .536 2.5 6.513 6.513 0 0 1-2.837 5.5c-1.883 1.385-4.533 2.084-7.921 2.084h-.806a1.432 1.432 0 0 0-1.331 1.063l-.954 4.129a1.42 1.42 0 0 1-1.32 1.046ZM3.649 19.1H.865a.827.827 0 0 1-.839-1.058L3.947 1.06A1.43 1.43 0 0 1 5.275 0h5.8a18.264 18.264 0 0 1 3.271.259 6.875 6.875 0 0 1 2.407.888 4.133 4.133 0 0 1 1.522 1.63 5.4 5.4 0 0 1 .524 2.508 6.474 6.474 0 0 1-2.84 5.486c-1.883 1.4-4.533 2.086-7.923 2.086h-.793a1.429 1.429 0 0 0-1.325 1.048l-.951 4.115a1.43 1.43 0 0 1-1.332 1.051Zm6.677-15.571h-.909A1.427 1.427 0 0 0 8.09 4.585L7.259 8.19a.824.824 0 0 0 .834 1.057h.687a5.857 5.857 0 0 0 3.5-.915 3.053 3.053 0 0 0 1.251-2.611 1.839 1.839 0 0 0-.807-1.65 4.349 4.349 0 0 0-2.408-.542h.017Z"
  })));
};
PaypalLogo.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "83.187",
  height: "21.519"
};
var logos = {
  card: CardLogo,
  paypal: PaypalLogo
};
exports.logos = logos;
var _default = logos;
exports.default = _default;
var areProvidedPaymentMethodIdsValid = function areProvidedPaymentMethodIdsValid(paymentMethodIds) {
  if (paymentMethodIds === null || paymentMethodIds === undefined || (0, _typeof2.default)(paymentMethodIds) !== 'object') return false;
  var supportedPaymentGateways = Object.keys(paymentMethodIds).filter(function (item) {
    return item === 'paypal' || item === 'adyen';
  });
  return !!supportedPaymentGateways.length;
};
exports.areProvidedPaymentMethodIdsValid = areProvidedPaymentMethodIdsValid;