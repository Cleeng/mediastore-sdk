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
var createOrder = function createOrder(offerId) {
  var paymentMethodId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var API_URL = (0, _environmentHelper.default)();
  var _jwtDecode = (0, _jwtDecode2.default)((0, _appConfigHelper.getData)('CLEENG_AUTH_TOKEN')),
    customerId = _jwtDecode.customerId;
  var url = "".concat(API_URL, "/orders");
  return (0, _fetchHelper.default)(url, {
    method: 'POST',
    body: JSON.stringify({
      offerId: offerId,
      customerId: customerId,
      paymentMethodId: paymentMethodId
    })
  }).then(function (res) {
    return res.json();
  });
};
var _default = createOrder;
exports.default = _default;