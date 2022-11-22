"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MSSDK_PURCHASE_SUCCESSFUL = exports.MSSDK_PURCHASE_FAILED = exports.MSSDK_ADYEN_ERROR = void 0;
var _default = function _default(title, detail) {
  window.dispatchEvent(new CustomEvent(title, {
    detail: detail
  }));
};
exports.default = _default;
var MSSDK_PURCHASE_SUCCESSFUL = 'MSSDK:purchase-successful';
exports.MSSDK_PURCHASE_SUCCESSFUL = MSSDK_PURCHASE_SUCCESSFUL;
var MSSDK_PURCHASE_FAILED = 'MSSDK:purchase-failed';
exports.MSSDK_PURCHASE_FAILED = MSSDK_PURCHASE_FAILED;
var MSSDK_ADYEN_ERROR = 'MSSDK:Adyen-error';
exports.MSSDK_ADYEN_ERROR = MSSDK_ADYEN_ERROR;