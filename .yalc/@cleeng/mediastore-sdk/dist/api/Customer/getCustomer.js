"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _appConfigHelper = require("../../util/appConfigHelper");
var _fetchHelper = _interopRequireDefault(require("../../util/fetchHelper"));
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var _jwtDecode2 = _interopRequireDefault(require("jwt-decode"));
var getCustomer = function getCustomer() {
  var API_URL = (0, _environmentHelper.default)();
  var _jwtDecode = (0, _jwtDecode2.default)((0, _appConfigHelper.getData)('CLEENG_AUTH_TOKEN')),
    customerId = _jwtDecode.customerId;
  var url = "".concat(API_URL, "/customers/").concat(customerId);
  return (0, _fetchHelper.default)(url, {
    method: 'GET'
  }).then(function (res) {
    return res.json();
  });
};
var _default = getCustomer;
exports.default = _default;