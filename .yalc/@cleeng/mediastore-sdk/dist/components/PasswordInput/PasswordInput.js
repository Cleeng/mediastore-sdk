"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Input = _interopRequireDefault(require("../Input"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var PasswordInput = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(PasswordInput, _React$Component);
  var _super = _createSuper(PasswordInput);
  function PasswordInput(props) {
    var _this;
    (0, _classCallCheck2.default)(this, PasswordInput);
    _this = _super.call(this, props);
    _this.onChangeFunction = function (value) {
      var _this$props = _this.props,
        onChange = _this$props.onChange,
        showPasswordStrength = _this$props.showPasswordStrength;
      if (showPasswordStrength) {
        var passwordStrength = _this.validateNewPassword(value);
        _this.setState({
          passError: _this.getErrorMessage(passwordStrength),
          errorLabel: passwordStrength
        });
      }
      onChange(value);
    };
    _this.validateNewPassword = function (pass) {
      var score = 0;
      if (pass && pass.length >= 8 && pass.match(/\d+/) && pass.match(/[a-zA-Z]/)) {
        if (pass.match(/[a-z]/)) {
          score += 1;
        }
        if (pass.match(/[A-Z]/)) {
          score += 5;
        }
        if (pass.match(/\d+/) && !pass.match(/^[0-9]*$/)) {
          score += 5;
        }
        if (pass.match(/(\d.*\d)/)) {
          score += 5;
        }
        if (pass.match(/[!,@#$%^&*?_~]/)) {
          score += 5;
        }
        if (pass.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/)) {
          score += 5;
        }
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) {
          score += 2;
        }
        if (pass.match(/\d/) && pass.match(/\D/)) {
          score += 2;
        }
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/) && pass.match(/\d/) && pass.match(/[!,@#$%^&*?_~]/)) {
          score += 2;
        }
        if (score <= 8) {
          return 'Weak';
        }
        if (score > 8 && score <= 16) {
          return 'Fair';
        }
        if (score > 16 && score <= 24) {
          return 'Good';
        }
        if (score > 24 && score <= 32) {
          return 'Strong';
        }
      }
      return 'NotValid';
    };
    _this.getErrorMessage = function (msg) {
      var t = _this.props.t;
      var errorLabel = {
        Weak: t('Weak'),
        Fair: t('Could be stronger'),
        Good: t('Good password'),
        Strong: t('Strong password'),
        NotValid: t('Your password must contain at least 8 characters, including 1 digit.')
      };
      return errorLabel[msg];
    };
    _this.state = {
      passError: '',
      errorLabel: ''
    };
    return _this;
  }
  (0, _createClass2.default)(PasswordInput, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        value = _this$props2.value,
        onBlur = _this$props2.onBlur,
        error = _this$props2.error,
        showVisibilityIcon = _this$props2.showVisibilityIcon,
        showPassword = _this$props2.showPassword,
        handleClickShowPassword = _this$props2.handleClickShowPassword,
        label = _this$props2.label,
        floatingLabels = _this$props2.floatingLabels;
      var _this$state = this.state,
        passError = _this$state.passError,
        errorLabel = _this$state.errorLabel;
      var errorMsg = error || passError;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Input.default, {
        placeholder: label,
        floatingLabels: floatingLabels,
        type: showPassword ? 'text' : 'password',
        value: value,
        onChange: this.onChangeFunction,
        onBlur: onBlur,
        error: errorMsg,
        showVisibilityIcon: showVisibilityIcon,
        handleClickShowPassword: handleClickShowPassword,
        showPassword: showPassword,
        passwordStrength: errorLabel,
        ariaRequired: true,
        ariaInvalid: errorLabel === 'NotValid'
      }));
    }
  }]);
  return PasswordInput;
}(_react.default.Component);
PasswordInput.propTypes = {
  value: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  error: _propTypes.default.string,
  showVisibilityIcon: _propTypes.default.bool,
  showPassword: _propTypes.default.bool,
  handleClickShowPassword: _propTypes.default.func,
  label: _propTypes.default.string,
  floatingLabels: _propTypes.default.bool,
  showPasswordStrength: _propTypes.default.bool,
  t: _propTypes.default.func
};
PasswordInput.defaultProps = {
  value: '',
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  error: '',
  showVisibilityIcon: false,
  showPassword: false,
  handleClickShowPassword: function handleClickShowPassword() {},
  label: 'Password',
  floatingLabels: true,
  showPasswordStrength: false,
  t: function t(k) {
    return k;
  }
};
var _default = PasswordInput;
exports.default = _default;