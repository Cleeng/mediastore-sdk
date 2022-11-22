"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var getCustomerLocales = function getCustomerLocales() {
  var API_URL = (0, _environmentHelper.default)();
  return fetch("".concat(API_URL, "/locales"), {}).then(function (res) {
    return res.json();
  });
};
var _default = getCustomerLocales;
exports.default = _default;