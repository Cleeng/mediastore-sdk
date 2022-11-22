"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _submitConsents = _interopRequireDefault(require("../../api/Customer/submitConsents"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _Consents = _interopRequireDefault(require("../Consents"));
var _LoginStyled = require("../LoginPage/LoginStyled");
var _Button = _interopRequireDefault(require("../Button"));
var _EmailInput = _interopRequireDefault(require("../EmailInput"));
var _PasswordInput = _interopRequireDefault(require("../PasswordInput"));
var _validators = require("../../util/validators");
var _registerCustomer = _interopRequireDefault(require("../../api/Auth/registerCustomer"));
var _getCustomerLocales = _interopRequireDefault(require("../../api/Customer/getCustomerLocales"));
var _auth = _interopRequireDefault(require("../../services/auth"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RegisterForm = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(RegisterForm, _Component);
  var _super = _createSuper(RegisterForm);
  function RegisterForm(props) {
    var _this;
    (0, _classCallCheck2.default)(this, RegisterForm);
    _this = _super.call(this, props);
    _this.handleClickShowPassword = function () {
      var showPassword = _this.state.showPassword;
      _this.setState({
        showPassword: !showPassword
      });
    };
    _this.validateEmail = function () {
      var _this$state = _this.state,
        email = _this$state.email,
        errors = _this$state.errors;
      var t = _this.props.t;
      var message = (0, _validators.validateEmailField)(email);
      _this.setState(function () {
        return {
          errors: _objectSpread(_objectSpread({}, errors), {}, {
            email: t(message)
          })
        };
      });
    };
    _this.validatePassword = function () {
      var _this$state2 = _this.state,
        password = _this$state2.password,
        errors = _this$state2.errors;
      var t = _this.props.t;
      var message = (0, _validators.validateRegisterPassword)(password);
      _this.setState(function () {
        return {
          errors: _objectSpread(_objectSpread({}, errors), {}, {
            password: t(message)
          })
        };
      });
    };
    _this.validateFields = function () {
      var _this$state3 = _this.state,
        email = _this$state3.email,
        password = _this$state3.password,
        consents = _this$state3.consents,
        consentDefinitions = _this$state3.consentDefinitions;
      var t = _this.props.t;
      var errorFields = {
        email: t((0, _validators.validateEmailField)(email)),
        password: t((0, _validators.validateRegisterPassword)(password)),
        consents: t((0, _validators.validateConsentsField)(consents, consentDefinitions))
      };
      _this.setState({
        errors: errorFields
      });
      return !Object.keys(errorFields).find(function (key) {
        return errorFields[key] !== '';
      });
    };
    _this.handleConsentsChange = function (value, consentDefinitions) {
      _this.setState(function (prev) {
        return {
          consents: value,
          consentDefinitions: consentDefinitions,
          errors: _objectSpread(_objectSpread({}, prev.errors), {}, {
            consents: ''
          })
        };
      });
    };
    _this.handleSubmit = function (event) {
      event.preventDefault();
      if (_this.validateFields()) {
        _this.register();
      }
    };
    _this.register = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _this$state4, email, password, consents, consentDefinitions, _this$props, onSuccess, publisherId, t, localesResponse, locales, response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$state4 = _this.state, email = _this$state4.email, password = _this$state4.password, consents = _this$state4.consents, consentDefinitions = _this$state4.consentDefinitions;
              _this$props = _this.props, onSuccess = _this$props.onSuccess, publisherId = _this$props.publisherId, t = _this$props.t;
              _this.setState({
                processing: true
              });
              _context.next = 5;
              return (0, _getCustomerLocales.default)();
            case 5:
              localesResponse = _context.sent;
              if (localesResponse.responseData) {
                _context.next = 9;
                break;
              }
              _this.setState({
                processing: false,
                generalError: t('An error occurred.')
              });
              return _context.abrupt("return", false);
            case 9:
              locales = localesResponse.responseData;
              _context.next = 12;
              return (0, _registerCustomer.default)(email, password, publisherId, locales.locale, locales.country, locales.currency);
            case 12:
              response = _context.sent;
              if (response.status === 200) {
                _auth.default.login(false, true, email, response.responseData.jwt, response.responseData.refreshToken, _submitConsents.default, [consents, consentDefinitions], onSuccess);
              } else if (response.status === 422) {
                if (response.errors[0].includes('Enterprise account is required')) {
                  _this.renderError('You would need our product <a href="https://cleeng.com/core-ott-subscriber-management" target="_blank">Core</a> to call this API');
                } else {
                  _this.renderError('Customer already exists.');
                }
              } else if (response.status === 429) {
                _this.setState({
                  disableActionButton: true
                });
                _this.renderError('Server overloaded. Please try again later.');
                setTimeout(function () {
                  _this.setState({
                    disableActionButton: false,
                    generalError: ''
                  });
                }, 10 * 1000);
              } else {
                _this.setState({
                  processing: false,
                  generalError: t('An error occurred.')
                });
              }
              return _context.abrupt("return", true);
            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this.renderError = function () {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'An error occurred.';
      var t = _this.props.t;
      _this.setState({
        processing: false,
        generalError: t(message)
      });
    };
    _this.handlePasswordChange = function (value) {
      var errors = _this.state.errors;
      _this.setState({
        password: value,
        errors: _objectSpread(_objectSpread({}, errors), {}, {
          password: ''
        })
      });
    };
    _this.disabledRegisterButton = function () {
      _this.setState({
        disableActionButton: true
      });
    };
    _this.state = {
      email: '',
      password: '',
      consents: [],
      errors: {
        email: '',
        password: '',
        consents: ''
      },
      generalError: '',
      showPassword: false,
      consentDefinitions: [],
      processing: false,
      disableActionButton: false
    };
    return _this;
  }
  (0, _createClass2.default)(RegisterForm, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state5 = this.state,
        email = _this$state5.email,
        password = _this$state5.password,
        errors = _this$state5.errors,
        generalError = _this$state5.generalError,
        showPassword = _this$state5.showPassword,
        disableActionButton = _this$state5.disableActionButton,
        processing = _this$state5.processing;
      var _this$props2 = this.props,
        publisherId = _this$props2.publisherId,
        t = _this$props2.t;
      return /*#__PURE__*/_react.default.createElement(_LoginStyled.FromStyled, {
        onSubmit: this.handleSubmit,
        noValidate: true
      }, /*#__PURE__*/_react.default.createElement(_LoginStyled.FormErrorStyled, {
        dangerouslySetInnerHTML: {
          __html: generalError
        }
      }), /*#__PURE__*/_react.default.createElement(_EmailInput.default, {
        label: t('Email'),
        floatingLabels: false,
        value: email,
        onChange: function onChange(e) {
          return _this2.setState({
            email: e
          });
        },
        onBlur: this.validateEmail,
        error: errors.email
      }), /*#__PURE__*/_react.default.createElement(_PasswordInput.default, {
        label: t('Password'),
        floatingLabels: false,
        value: password,
        onChange: this.handlePasswordChange,
        onBlur: this.validatePassword,
        error: errors.password,
        showVisibilityIcon: true,
        showPassword: showPassword,
        handleClickShowPassword: this.handleClickShowPassword,
        showPasswordStrength: true,
        t: t
      }), /*#__PURE__*/_react.default.createElement(_Consents.default, {
        t: t,
        publisherId: publisherId,
        error: errors.consents,
        onChangeFn: this.handleConsentsChange,
        disabledRegisterButton: this.disabledRegisterButton
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        type: "submit",
        size: "big",
        theme: "confirm",
        margin: "10px 0",
        disabled: processing || disableActionButton
      }, processing ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Register')));
    }
  }]);
  return RegisterForm;
}(_react.Component);
RegisterForm.propTypes = {
  publisherId: _propTypes.default.string,
  onSuccess: _propTypes.default.func,
  t: _propTypes.default.func
};
RegisterForm.defaultProps = {
  publisherId: '',
  onSuccess: function onSuccess() {},
  t: function t(k) {
    return k;
  }
};
var _default = RegisterForm;
exports.default = _default;