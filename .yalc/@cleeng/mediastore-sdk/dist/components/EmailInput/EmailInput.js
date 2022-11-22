"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Input = _interopRequireDefault(require("../Input"));
var EmailInput = function EmailInput(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    error = _ref.error,
    label = _ref.label,
    floatingLabels = _ref.floatingLabels,
    required = _ref.required,
    reference = _ref.reference;
  return /*#__PURE__*/_react.default.createElement(_Input.default, {
    placeholder: label,
    floatingLabels: floatingLabels,
    type: "email",
    value: value,
    onChange: onChange,
    onBlur: onBlur,
    error: error,
    required: required,
    reference: reference,
    ariaRequired: required,
    ariaInvalid: !!error
  });
};
EmailInput.propTypes = {
  value: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  error: _propTypes.default.string,
  label: _propTypes.default.string,
  floatingLabels: _propTypes.default.bool,
  required: _propTypes.default.bool,
  reference: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape()])
};
EmailInput.defaultProps = {
  value: '',
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  error: '',
  label: 'Email',
  floatingLabels: true,
  required: false,
  reference: function reference() {}
};
var _default = EmailInput;
exports.default = _default;