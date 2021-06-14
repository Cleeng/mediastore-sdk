"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _subscriptionCardPlaceholder = require("assets/images/subscriptionCardPlaceholder.svg");

var mapErrorToText = {
  RECURRING_PROCESS_ALREADY_STARTED: {
    title: 'You are at the end of the billing cycle for your current offer.',
    subtitle: 'Once the new one starts, you can switch to a new offer.',
    icon: _subscriptionCardPlaceholder.ReactComponent
  },
  PAYMENT_GATEWAY_NOT_SUPPORTED: {
    title: 'Your payment method does not allow switching to a new plan from here.',
    subtitle: 'If you signed up via a mobile app, it may be possible to change your plan there.',
    icon: _subscriptionCardPlaceholder.ReactComponent
  },
  SUBSCRIPTION_WITH_COUPON_NOT_ALLOWED: {
    title: 'You can`t upgrade your subscription if coupon was applied.',
    subtitle: '',
    icon: _subscriptionCardPlaceholder.ReactComponent
  },
  DEFAULT: {
    title: 'It looks like you can`t change your current plan.',
    subtitle: 'Try again later.',
    icon: _subscriptionCardPlaceholder.ReactComponent
  }
};
var _default = mapErrorToText;
exports.default = _default;