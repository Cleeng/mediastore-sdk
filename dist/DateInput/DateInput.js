"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("components/Input"));

var _calendar = require("assets/images/calendar.svg");

var DateInput = function DateInput(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      error = _ref.error,
      label = _ref.label,
      required = _ref.required;
  return /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "date",
    placeholder: label,
    format: "dd/mm/yyyy",
    value: value,
    icon: _calendar.ReactComponent,
    onChange: onChange,
    onBlur: onBlur,
    error: error,
    required: required
  });
};

DateInput.defaultProps = {
  value: '',
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  error: '',
  label: '',
  required: false
};
var _default = DateInput;
exports.default = _default;