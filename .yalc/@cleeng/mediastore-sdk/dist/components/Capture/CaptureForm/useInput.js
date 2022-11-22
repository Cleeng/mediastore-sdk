"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var useInput = function useInput(initialValue) {
  var _useState = (0, _react.useState)(initialValue),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    value = _useState2[0],
    setHookValue = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  var setValue = function setValue(v) {
    var newValue = v || '';
    setError('');
    setHookValue(newValue);
  };
  var onChange = function onChange(newValue) {
    setValue(newValue);
  };
  return {
    value: value,
    setValue: setValue,
    error: error,
    setError: setError,
    onChange: onChange
  };
};
var _default = useInput;
exports.default = _default;