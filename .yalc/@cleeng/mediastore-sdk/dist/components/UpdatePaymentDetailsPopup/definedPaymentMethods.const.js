"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ACTIONS = void 0;
var _react = _interopRequireDefault(require("react"));
var CardIcon = function CardIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M0 19.893a2.388 2.388 0 0 0 2.387 2.387h23.872a2.388 2.388 0 0 0 2.387-2.387V11.14H0Zm9.549-3.382a.6.6 0 0 1 .6-.6h6.764a.6.6 0 0 1 .6.6V18.5a.6.6 0 0 1-.6.6h-6.768a.6.6 0 0 1-.6-.6Zm-6.366 0a.6.6 0 0 1 .6-.6H7.36a.6.6 0 0 1 .6.6V18.5a.6.6 0 0 1-.6.6H3.78a.6.6 0 0 1-.6-.6ZM28.646 2.387v2.387H0V2.387A2.388 2.388 0 0 1 2.387 0h23.872a2.388 2.388 0 0 1 2.387 2.387Z",
    fill: "#bcc3cd"
  }));
};
CardIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "28.646",
  height: "22.28"
};
var PPIcon = function PPIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#bcc3cd",
    d: "M9.438 22.019H6.655a.826.826 0 0 1-.839-1.058l.134-.6h1.856A1.431 1.431 0 0 0 9.135 19.3l.954-4.117a1.434 1.434 0 0 1 1.327-1.058h.791q5.1 0 7.926-2.1a6.529 6.529 0 0 0 2.833-5.5 5.266 5.266 0 0 0-.527-2.5c0-.014-.014-.028-.014-.041l.121.067a4.146 4.146 0 0 1 1.534 1.627 5.228 5.228 0 0 1 .536 2.5 6.513 6.513 0 0 1-2.837 5.5c-1.883 1.385-4.533 2.084-7.921 2.084h-.806a1.432 1.432 0 0 0-1.331 1.063l-.954 4.129A1.42 1.42 0 0 1 9.447 22l-.009.019zm-2.401-2.42H4.253a.827.827 0 0 1-.839-1.057L7.335 1.56A1.43 1.43 0 0 1 8.663.5h5.8a18.264 18.264 0 0 1 3.271.259 6.875 6.875 0 0 1 2.407.888 4.133 4.133 0 0 1 1.522 1.63 5.4 5.4 0 0 1 .524 2.508 6.474 6.474 0 0 1-2.84 5.486c-1.883 1.4-4.533 2.086-7.923 2.086h-.793a1.429 1.429 0 0 0-1.325 1.048l-.951 4.115a1.43 1.43 0 0 1-1.332 1.05l.014.03zm6.677-15.57h-.909a1.427 1.427 0 0 0-1.327 1.056l-.831 3.605a.824.824 0 0 0 .834 1.057h.687a5.857 5.857 0 0 0 3.5-.915 3.053 3.053 0 0 0 1.251-2.611 1.839 1.839 0 0 0-.807-1.65 4.349 4.349 0 0 0-2.408-.542h.017-.007z"
  })));
};
PPIcon.defaultProps = {
  width: "28",
  height: "22.519",
  xmlns: "http://www.w3.org/2000/svg"
};
var ACTIONS = {
  delete: 'delete',
  addCard: 'addCard',
  addPayPal: 'addPayPal'
};
exports.ACTIONS = ACTIONS;
var supportedPaymentGateways = [{
  key: ACTIONS.addCard,
  icon: CardIcon,
  title: 'Credit or Debit card',
  description: 'Add your card details here',
  paymentGateway: 'adyen'
}, {
  key: ACTIONS.addPayPal,
  icon: PPIcon,
  title: 'PayPal',
  description: 'Connect your PayPal account here',
  paymentGateway: 'paypal'
}];
var _default = supportedPaymentGateways;
exports.default = _default;