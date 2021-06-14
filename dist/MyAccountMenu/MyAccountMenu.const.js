"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItems = void 0;

var _plan_details = require("./icons/plan_details.svg");

var _payment = require("./icons/payment.svg");

var _update = require("./icons/update.svg");

// eslint-disable-next-line import/prefer-default-export
var MenuItems = [{
  icon: _plan_details.ReactComponent,
  label: 'Plan Details',
  link: 'plan-details',
  visibleOnDesktop: true
}, {
  icon: _payment.ReactComponent,
  label: 'Your Payments',
  link: 'payment-info',
  visibleOnDesktop: true
}, {
  icon: _update.ReactComponent,
  label: 'Update Profile',
  link: 'update-profile',
  visibleOnDesktop: true
}];
exports.MenuItems = MenuItems;