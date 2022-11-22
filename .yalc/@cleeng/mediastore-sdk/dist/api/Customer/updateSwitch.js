"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fetchHelper = _interopRequireDefault(require("../../util/fetchHelper"));
var _environmentHelper = _interopRequireDefault(require("../../util/environmentHelper"));
var updateSwtich = function updateSwtich(pendingSwitchId) {
  var API_URL = (0, _environmentHelper.default)();
  var url = "".concat(API_URL, "/subscription_switches/").concat(pendingSwitchId);
  return (0, _fetchHelper.default)(url, {
    method: 'PATCH',
    body: JSON.stringify({
      status: 'cancelled'
    })
  }).then(function (res) {
    return res.json();
  });
};
var _default = updateSwtich;
exports.default = _default;