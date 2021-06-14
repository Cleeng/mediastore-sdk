"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _loginCustomer = _interopRequireDefault(require("api/Auth/loginCustomer"));

var _auth = _interopRequireDefault(require("services/auth"));

var _getCustomerLocales = _interopRequireDefault(require("api/Customer/getCustomerLocales"));

var _Button = _interopRequireDefault(require("components/Button"));

var _EmailInput = _interopRequireDefault(require("components/EmailInput"));

var _PasswordInput = _interopRequireDefault(require("components/PasswordInput"));

var _validators = require("util/validators");

var _appConfigHelper = require("util/appConfigHelper");

var _LoginStyled = require("./LoginStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var LoginForm = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(LoginForm, _Component);

  var _super = (0, _createSuper2.default)(LoginForm);

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
          errors: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, errors), {}, {
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
          errors: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, errors), {}, {
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
      var _this$props, offerId, setOfferError, isMyAccount, publisherId, _this$state4, email, password, loginBy, response;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, offerId = _this$props.offerId, setOfferError = _this$props.setOfferError, isMyAccount = _this$props.isMyAccount, publisherId = _this$props.publisherId;
              _this$state4 = _this.state, email = _this$state4.email, password = _this$state4.password;

              if (!(!offerId && !isMyAccount)) {
                _context.next = 5;
                break;
              }

              setOfferError(true);
              return _context.abrupt("return", false);

            case 5:
              _this.setState({
                processing: true,
                hideSuccessMessage: true
              });

              if (isMyAccount) {
                loginBy = {
                  publisherId: publisherId
                };
              } else {
                loginBy = {
                  offerId: offerId
                };
              }

              _context.next = 9;
              return (0, _loginCustomer.default)(email, password, loginBy);

            case 9:
              response = _context.sent;

              if (!(response.status === 200)) {
                _context.next = 15;
                break;
              }

              _context.next = 13;
              return (0, _getCustomerLocales.default)().then(function (resp) {
                (0, _appConfigHelper.setData)('CLEENG_CUSTOMER_IP', resp.responseData.ipAddress);

                _auth.default.login(!!isMyAccount, false, email, response.responseData.jwt);
              }).catch(function () {
                _this.renderError();
              });

            case 13:
              _context.next = 16;
              break;

            case 15:
              if (response.status === 401 || response.status === 422) {
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

            case 16:
              return _context.abrupt("return", true);

            case 17:
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

LoginForm.defaultProps = {
  offerId: '',
  publisherId: '',
  isMyAccount: false,
  setOfferError: function setOfferError() {},
  emailChanged: false,
  t: function t(k) {
    return k;
  }
};
var _default = LoginForm;
exports.default = _default;