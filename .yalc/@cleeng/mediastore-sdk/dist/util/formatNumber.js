"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var formatNumber = function formatNumber(number) {
  var decimalPlaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return Number(number).toFixed(decimalPlaces);
};
var _default = formatNumber;
exports.default = _default;