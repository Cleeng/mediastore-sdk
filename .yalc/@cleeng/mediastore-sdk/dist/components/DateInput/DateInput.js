"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Input = _interopRequireDefault(require("../Input"));
var CalendarIcon = function CalendarIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zM8 16H4v4h4v-4zm6 0h-4v4h4v-4zm-6-6H4v4h4v-4zm16-8v22H0V2h3v1c0 1.103.897 2 2 2s2-.897 2-2V2h10v1c0 1.103.897 2 2 2s2-.897 2-2V2h3zm-2 6H2v14h20V8zm-2-7a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V1zM6 3a1 1 0 1 1-2 0V1a1 1 0 1 1 2 0v2z"
  }));
};
CalendarIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24"
};
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
    icon: CalendarIcon,
    onChange: onChange,
    onBlur: onBlur,
    error: error,
    required: required
  });
};
DateInput.propTypes = {
  value: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  error: _propTypes.default.string,
  label: _propTypes.default.string,
  required: _propTypes.default.bool
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