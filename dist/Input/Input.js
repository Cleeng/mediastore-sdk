"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _visibility = _interopRequireDefault(require("assets/images/visibility.svg"));

var _visibilityOff = _interopRequireDefault(require("assets/images/visibilityOff.svg"));

var _InputStyled = require("./InputStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Input = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Input, _Component);

  var _super = (0, _createSuper2.default)(Input);

  function Input(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Input);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(Input, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          placeholder = _this$props.placeholder,
          value = _this$props.value,
          _onChange = _this$props.onChange,
          onBlur = _this$props.onBlur,
          error = _this$props.error,
          showVisibilityIcon = _this$props.showVisibilityIcon,
          handleClickShowPassword = _this$props.handleClickShowPassword,
          showPassword = _this$props.showPassword,
          passwordStrength = _this$props.passwordStrength,
          ariaRequired = _this$props.ariaRequired,
          ariaInvalid = _this$props.ariaInvalid,
          icon = _this$props.icon,
          required = _this$props.required,
          floatingLabels = _this$props.floatingLabels,
          reference = _this$props.reference;
      return /*#__PURE__*/_react.default.createElement(_InputStyled.InputComponentStyled, null, /*#__PURE__*/_react.default.createElement(_InputStyled.InputElementWrapperStyled, {
        error: error,
        passwordStrength: passwordStrength
      }, icon && /*#__PURE__*/_react.default.createElement(_InputStyled.InputIconStyled, null, icon.render()), required && /*#__PURE__*/_react.default.createElement(_InputStyled.InputRequiredStyled, null, "*"), /*#__PURE__*/_react.default.createElement(_InputStyled.InputElementStyled, {
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
        htmlFor: placeholder,
        hasValue: value,
        withIcon: icon
      }, placeholder), showVisibilityIcon && /*#__PURE__*/_react.default.createElement(_InputStyled.StyledButton, {
        onClick: handleClickShowPassword,
        tabIndex: "0",
        "aria-label": "toggle password visibility",
        type: "button"
      }, showPassword ? /*#__PURE__*/_react.default.createElement(_InputStyled.StyledPasswordVisibility, {
        src: _visibilityOff.default,
        alt: ""
      }) : /*#__PURE__*/_react.default.createElement(_InputStyled.StyledPasswordVisibility, {
        src: _visibility.default,
        alt: ""
      }))), /*#__PURE__*/_react.default.createElement(_InputStyled.ErrorWrapper, {
        passwordStrength: passwordStrength,
        id: "".concat(placeholder, "-desc")
      }, error));
    }
  }]);
  return Input;
}(_react.Component);

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
  reference: {
    current: null
  }
};
var _default = Input;
exports.default = _default;