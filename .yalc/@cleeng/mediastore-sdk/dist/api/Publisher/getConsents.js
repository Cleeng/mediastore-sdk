"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var getConsents = function getConsents(publisherId) {
  var API_URL = (0, _environmentHelper.default)();
  return fetch("".concat(API_URL, "/publishers/").concat(publisherId, "/consents"), {
    method: 'GET'
  }).then(function (res) {
    return res.json();
  });
};
var _default = getConsents;
exports.default = _default;