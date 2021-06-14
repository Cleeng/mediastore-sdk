"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("components/Input"));

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

EmailInput.defaultProps = {
  value: '',
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  error: '',
  label: 'Email',
  floatingLabels: true,
  required: false,
  reference: {
    current: null
  }
};
var _default = EmailInput;
exports.default = _default;