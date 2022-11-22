"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fetchHelper = _interopRequireDefault(require("../../util/fetchHelper"));
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var getPaymentMethods = function getPaymentMethods() {
  var API_URL = (0, _environmentHelper.default)();
  return (0, _fetchHelper.default)("".concat(API_URL, "/payment-methods"), {
    method: 'GET'
  }).then(function (res) {
    return res.json();
  });
};
var _default = getPaymentMethods;
exports.default = _default;