"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fetchHelper = _interopRequireDefault(require("../../util/fetchHelper"));
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var getOrder = function getOrder(orderId) {
  var API_URL = (0, _environmentHelper.default)();
  var url = "".concat(API_URL, "/orders/").concat(orderId);
  return (0, _fetchHelper.default)(url, {
    method: 'GET'
  }).then(function (res) {
    return res.json();
  });
};
var _default = getOrder;
exports.default = _default;