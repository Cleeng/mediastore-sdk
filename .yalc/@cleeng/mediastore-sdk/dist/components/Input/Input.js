"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _visibleBase = _interopRequireDefault(require("./icons/visibleBase64"));
var _unvisibleBase = _interopRequireDefault(require("./icons/unvisibleBase64"));
var _InputStyled = require("./InputStyled");
var Input = function Input(_ref) {
  var type = _ref.type,
    placeholder = _ref.placeholder,
    value = _ref.value,
    _onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    error = _ref.error,
    showVisibilityIcon = _ref.showVisibilityIcon,
    handleClickShowPassword = _ref.handleClickShowPassword,
    showPassword = _ref.showPassword,
    passwordStrength = _ref.passwordStrength,
    ariaRequired = _ref.ariaRequired,
    ariaInvalid = _ref.ariaInvalid,
    icon = _ref.icon,
    required = _ref.required,
    floatingLabels = _ref.floatingLabels,
    reference = _ref.reference;
  return /*#__PURE__*/_react.default.createElement(_InputStyled.InputComponentStyled, null, /*#__PURE__*/_react.default.createElement(_InputStyled.InputElementWrapperStyled, {
    error: error,
    passwordStrength: passwordStrength
  }, required && /*#__PURE__*/_react.default.createElement(_InputStyled.InputRequiredStyled, null, "*"), /*#__PURE__*/_react.default.createElement(_InputStyled.InputElementStyled, {
    "data-testid": "input",
    id: placeholder,
    autoComplete: "off",
    value: value,
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    },
    type: type,
    onBlur: onBlur,
    ref: reference,
    "aria-required": ariaRequired,
    "aria-invalid": ariaInvalid,
    "aria-describedby": "".concat(placeholder, "-desc"),
    withIcon: icon,
    floatingLabels: floatingLabels
  }), /*#__PURE__*/_react.default.createElement(_InputStyled.LabelStyled, {
    "data-testid": "input-label",
    htmlFor: placeholder,
    hasValue: value,
    withIcon: icon
  }, placeholder), showVisibilityIcon && /*#__PURE__*/_react.default.createElement(_InputStyled.StyledButton, {
    "data-testid": "input-visibility-icon",
    onClick: handleClickShowPassword,
    tabIndex: "0",
    "aria-label": "toggle password visibility",
    type: "button"
  }, showPassword ? /*#__PURE__*/_react.default.createElement(_InputStyled.StyledPasswordVisibility, {
    src: _unvisibleBase.default,
    alt: ""
  }) : /*#__PURE__*/_react.default.createElement(_InputStyled.StyledPasswordVisibility, {
    src: _visibleBase.default,
    alt: ""
  }))), /*#__PURE__*/_react.default.createElement(_InputStyled.ErrorWrapper, {
    passwordStrength: passwordStrength,
    id: "".concat(placeholder, "-desc")
  }, error));
};
Input.propTypes = {
  placeholder: _propTypes.default.string,
  type: _propTypes.default.oneOf(['text', 'password', 'date', 'email']),
  value: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  error: _propTypes.default.string,
  showVisibilityIcon: _propTypes.default.bool,
  handleClickShowPassword: _propTypes.default.func,
  showPassword: _propTypes.default.bool,
  passwordStrength: _propTypes.default.oneOf(['Weak', 'Fair', 'Good', 'Strong', '']),
  ariaRequired: _propTypes.default.bool,
  ariaInvalid: _propTypes.default.bool,
  icon: _propTypes.default.elementType,
  required: _propTypes.default.bool,
  floatingLabels: _propTypes.default.bool,
  reference: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape()])
};
Input.defaultProps = {
  placeholder: '',
  type: 'text',
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  error: '',
  value: '',
  showVisibilityIcon: false,
  handleClickShowPassword: function handleClickShowPassword() {},
  showPassword: false,
  passwordStrength: '',
  ariaRequired: false,
  ariaInvalid: false,
  icon: null,
  required: false,
  floatingLabels: true,
  reference: function reference() {}
};
var _default = Input;
exports.default = _default;