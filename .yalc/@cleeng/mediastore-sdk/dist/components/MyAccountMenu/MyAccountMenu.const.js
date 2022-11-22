"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItems = void 0;
var _react = _interopRequireDefault(require("react"));
var PlanIcon = function PlanIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M22.242 7.414H2.471V4.943h19.77ZM19.77 0H4.943v2.471H19.77Zm4.943 12.356v9.885a2.479 2.479 0 0 1-2.471 2.471H2.471A2.479 2.479 0 0 1 0 22.242v-9.886a2.479 2.479 0 0 1 2.471-2.471h19.77a2.479 2.479 0 0 1 2.472 2.471ZM17.3 17.3l-7.414-4.041v8.069Z",
    fill: "#fff"
  }));
};
PlanIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24.713",
  height: "24.713"
};
var PaymentIcon = function PaymentIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M27 0H3A2.977 2.977 0 0 0 .015 3L0 21a2.99 2.99 0 0 0 3 3h24a2.99 2.99 0 0 0 3-3V3a2.99 2.99 0 0 0-3-3Zm0 21H3v-9h24Zm0-15H3V3h24Z",
    fill: "#fff"
  }));
};
PaymentIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "30",
  height: "24"
};
var UpdateIcon = function UpdateIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "m25.064 1.888-1.888 1V.06l-3.9-.06.025 2.888H7.591l.08-2.892-3.816.06v2.892l-1.927-.06A1.929 1.929 0 0 0 .001 4.82v13.5a1.929 1.929 0 0 0 1.928 1.928h23.135a1.929 1.929 0 0 0 1.928-1.928V4.82c0-1.064-.864-2.932-1.928-2.932ZM20.244.96h1.928v3.856h-1.928ZM7.712 7.531c1.165 0 2.109 1.241 2.109 2.772s-.945 2.772-2.109 2.772-2.111-1.242-2.111-2.772.945-2.772 2.109-2.772ZM4.82.964h1.928V4.82H4.82ZM3.535 16.338s.228-1.834.748-2.18a7.393 7.393 0 0 1 2.015-.576s.97 1.036 1.382 1.036 1.381-1.036 1.381-1.036a7.371 7.371 0 0 1 2.016.576c.61.407.763 2.18.763 2.18H3.535Zm19.6-.914H14.46v-.964h8.676Zm0-1.928H14.46v-.964h8.676Zm0-1.928H14.46v-.964h8.676Zm0-1.928H14.46v-.964h8.676Z",
    fill: "#fff"
  }));
};
UpdateIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "26.992",
  height: "20.244"
}; // eslint-disable-next-line import/prefer-default-export
var MenuItems = [{
  id: 'planDetails',
  icon: PlanIcon,
  label: 'Plan Details',
  link: 'plan-details',
  visibleOnDesktop: true
}, {
  id: 'paymentInfo',
  icon: PaymentIcon,
  label: 'Your Payments',
  link: 'payment-info',
  visibleOnDesktop: true
}, {
  id: 'updateProfile',
  icon: UpdateIcon,
  label: 'Update Profile',
  link: 'update-profile',
  visibleOnDesktop: true
}];
exports.MenuItems = MenuItems;