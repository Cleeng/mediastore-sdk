"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable prefer-template */

var roundNumber = function roundNumber(number) {
  var decimalPlaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '2';
  return Number(Math.round(number + 'e' + decimalPlaces) + "e-" + decimalPlaces).toFixed(2);
};
var _default = roundNumber;
exports.default = _default;