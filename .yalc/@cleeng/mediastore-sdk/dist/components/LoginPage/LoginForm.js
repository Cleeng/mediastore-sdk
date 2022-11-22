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
var _Loader = _interopRequireDefault(require("../Loader"));
var _auth = _interopRequireDefault(require("../../services/auth"));
var _Button = _interopRequireDefault(require("../Button"));
var _EmailInput = _interopRequireDefault(require("../EmailInput"));
var _PasswordInput = _interopRequireDefault(require("../PasswordInput"));
var _validators = require("../../util/validators");
var _loginCustomer = _interopRequireDefault(require("../../api/Auth/loginCustomer"));
var _LoginStyled = require("./LoginStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var LoginForm = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(LoginForm, _Component);
  var _super = _createSuper(LoginForm);
  function LoginForm(props) {
    var _this;
    (0, _classCallCheck2.default)(this, LoginForm);
    _this = _super.call(this, props);
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
      var message = (0, _validators.validatePasswordField)(password);
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
        password = _this$state3.password;
      var t = _this.props.t;
      var errorFields = {
        email: t((0, _validators.validateEmailField)(email)),
        password: t((0, _validators.validatePasswordField)(password))
      };
      _this.setState({
        errors: errorFields,
        generalError: ''
      });
      return !Object.keys(errorFields).find(function (key) {
        return errorFields[key] !== '';
      });
    };
    _this.handleSubmit = function (event) {
      event.preventDefault();
      if (_this.validateFields()) {
        _this.login();
      }
    };
    _this.login = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var _this$props, offerId, isMyAccount, publisherId, onSuccess, _this$state4, email, password, response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, offerId = _this$props.offerId, isMyAccount = _this$props.isMyAccount, publisherId = _this$props.publisherId, onSuccess = _this$props.onSuccess;
              _this$state4 = _this.state, email = _this$state4.email, password = _this$state4.password;
              _this.setState({
                processing: true,
                hideSuccessMessage: true
              });
              _context.next = 5;
              return (0, _loginCustomer.default)(email, password, publisherId ? {
                publisherId: publisherId
              } : {
                offerId: offerId
              });
            case 5:
              response = _context.sent;
              if (response.status === 200) {
                _auth.default.login(!!isMyAccount, false, email, response.responseData.jwt, response.responseData.refreshToken, null, null, onSuccess);
              } else if (response.status === 401 || response.status === 422) {
                _this.renderError('Wrong email or password');
              } else if (response.status === 429) {
                _this.setState({
                  overloaded: true
                });
                _this.renderError('Server overloaded. Please try again later.', true);
                setTimeout(function () {
                  _this.setState({
                    overloaded: false,
                    generalError: ''
                  });
                }, 10 * 1000);
              } else {
                _this.renderError();
              }
              return _context.abrupt("return", true);
            case 8:
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
    _this.emailInput = /*#__PURE__*/_react.default.createRef();
    _this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      },
      generalError: '',
      processing: false,
      overloaded: false,
      hideSuccessMessage: false
    };
    return _this;
  }
  (0, _createClass2.default)(LoginForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.emailInput && this.emailInput.current) this.emailInput.current.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state5 = this.state,
        email = _this$state5.email,
        password = _this$state5.password,
        errors = _this$state5.errors,
        generalError = _this$state5.generalError,
        processing = _this$state5.processing,
        overloaded = _this$state5.overloaded,
        hideSuccessMessage = _this$state5.hideSuccessMessage;
      var _this$props2 = this.props,
        emailChanged = _this$props2.emailChanged,
        t = _this$props2.t;
      return /*#__PURE__*/_react.default.createElement(_LoginStyled.FromStyled, {
        onSubmit: this.handleSubmit,
        noValidate: true
      }, emailChanged && !generalError && !hideSuccessMessage ? /*#__PURE__*/_react.default.createElement(_LoginStyled.FormSuccessStyled, null, t('Your email has been changed succesfully')) : /*#__PURE__*/_react.default.createElement(_LoginStyled.FormErrorStyled, null, generalError), /*#__PURE__*/_react.default.createElement(_EmailInput.default, {
        reference: this.emailInput,
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
        onChange: function onChange(e) {
          return _this2.setState({
            password: e
          });
        },
        onBlur: this.validatePassword,
        error: errors.password
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        type: "submit",
        size: "big",
        theme: "confirm",
        margin: "10px 0",
        disabled: processing || overloaded
      }, processing ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Sign in')));
    }
  }]);
  return LoginForm;
}(_react.Component);
LoginForm.propTypes = {
  offerId: _propTypes.default.string,
  publisherId: _propTypes.default.string,
  isMyAccount: _propTypes.default.bool,
  emailChanged: _propTypes.default.bool,
  onSuccess: _propTypes.default.func,
  t: _propTypes.default.func
};
LoginForm.defaultProps = {
  offerId: '',
  publisherId: '',
  isMyAccount: false,
  emailChanged: false,
  onSuccess: function onSuccess() {},
  t: function t(k) {
    return k;
  }
};
var _default = LoginForm;
exports.default = _default;