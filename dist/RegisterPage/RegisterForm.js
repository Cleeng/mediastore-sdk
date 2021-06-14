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

var _submitConsents = _interopRequireDefault(require("api/Customer/submitConsents"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _Consents = _interopRequireDefault(require("components/Consents"));

var _LoginStyled = require("components/LoginPage/LoginStyled");

var _Button = _interopRequireDefault(require("components/Button"));

var _EmailInput = _interopRequireDefault(require("components/EmailInput"));

var _PasswordInput = _interopRequireDefault(require("components/PasswordInput"));

var _validators = require("util/validators");

var _registerCustomer = _interopRequireDefault(require("api/Auth/registerCustomer"));

var _getCustomerLocales = _interopRequireDefault(require("api/Customer/getCustomerLocales"));

var _auth = _interopRequireDefault(require("services/auth"));

var _appConfigHelper = require("util/appConfigHelper");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RegisterForm = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(RegisterForm, _Component);

  var _super = (0, _createSuper2.default)(RegisterForm);

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
      var message = (0, _validators.validateRegisterPassword)(password);

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
          errors: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, prev.errors), {}, {
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
      var _this$state4, email, password, consents, consentDefinitions, _this$props, offerId, setOfferError, t, localesResponse, locales, response;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$state4 = _this.state, email = _this$state4.email, password = _this$state4.password, consents = _this$state4.consents, consentDefinitions = _this$state4.consentDefinitions;
              _this$props = _this.props, offerId = _this$props.offerId, setOfferError = _this$props.setOfferError, t = _this$props.t;

              if (offerId) {
                _context.next = 5;
                break;
              }

              setOfferError(true);
              return _context.abrupt("return", false);

            case 5:
              _this.setState({
                processing: true
              });

              _context.next = 8;
              return (0, _getCustomerLocales.default)();

            case 8:
              localesResponse = _context.sent;

              if (localesResponse.responseData) {
                _context.next = 12;
                break;
              }

              _this.setState({
                processing: false,
                generalError: t('An error occurred.')
              });

              return _context.abrupt("return", false);

            case 12:
              locales = localesResponse.responseData;
              (0, _appConfigHelper.setData)('CLEENG_CUSTOMER_IP', locales.ipAddress);
              _context.next = 16;
              return (0, _registerCustomer.default)(email, password, offerId, locales.locale, locales.country, locales.currency);

            case 16:
              response = _context.sent;

              if (response.status === 200) {
                _auth.default.login(false, true, email, response.responseData.jwt, _submitConsents.default, [consents, consentDefinitions]);
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

            case 19:
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
        errors: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, errors), {}, {
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

RegisterForm.defaultProps = {
  offerId: '',
  publisherId: '',
  setOfferError: function setOfferError() {},
  t: function t(k) {
    return k;
  }
};
var _default = RegisterForm;
exports.default = _default;