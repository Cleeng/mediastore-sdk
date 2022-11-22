"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _appConfigHelper = require("./appConfigHelper");
var ENVIRONMENTS = {
  DEVELOPMENT: '',
  STAGING: 'https://hc0f1jaa70.execute-api.eu-west-1.amazonaws.com/staging',
  SANDBOX: 'https://mediastoreapi-sandbox.cleeng.com',
  PRODUCTION: 'https://mediastoreapi.cleeng.com'
};
var getApiURL = function getApiURL() {
  var environment = (0, _appConfigHelper.getData)('CLEENG_ENVIRONMENT');
  switch (environment) {
    case 'development':
      return ENVIRONMENTS.DEVELOPMENT;
    case 'staging':
      return ENVIRONMENTS.STAGING;
    case 'sandbox':
      return ENVIRONMENTS.SANDBOX;
    case 'production':
      return ENVIRONMENTS.PRODUCTION;
    default:
      return ENVIRONMENTS.SANDBOX;
  }
};
var _default = getApiURL;
exports.default = _default;