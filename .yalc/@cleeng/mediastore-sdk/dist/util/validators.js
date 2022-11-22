"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateConsents = validateConsents;
exports.validateConsentsField = validateConsentsField;
exports.validateEmail = validateEmail;
exports.validateEmailField = validateEmailField;
exports.validatePasswordField = validatePasswordField;
exports.validateRegisterPassword = validateRegisterPassword;
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
  return re.test(String(email).toLowerCase());
}
function validateConsents(value, consentDefinitions) {
  return consentDefinitions.every(function (consent, index) {
    return !(consent.required && !value[index]);
  });
}
function validateConsentsField(value, consents) {
  if (!validateConsents(value, consents)) {
    return 'Please agree on all consents to use this service';
  }
  return '';
}
function validatePasswordField(password) {
  var message = '';
  if (password === '') {
    message = 'Please fill out this field.';
  }
  return message;
}
function validateRegisterPassword(password) {
  var message = '';
  var re = /[0-9]+/;
  var validPassword = re.test(password) && password.length >= 8;
  if (password === '') {
    message = 'Please fill out this field.';
  } else if (!validPassword) {
    message = 'Your password must contain at least 8 characters, including 1 digit.';
  }
  return message;
}
function validateEmailField(value) {
  var message = '';
  if (!validateEmail(value)) {
    message = 'The email address is not properly formatted.';
  }
  if (value === '') {
    message = 'Please fill out this field.';
  }
  return message;
}