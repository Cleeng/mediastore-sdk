"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PurePasswordReset = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _EmailInput = _interopRequireDefault(require("../EmailInput"));
var _Button = _interopRequireDefault(require("../Button"));
var _Header = _interopRequireDefault(require("../Header"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _resetPassword = _interopRequireDefault(require("../../api/Auth/resetPassword"));
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _PasswordResetStyled = require("./PasswordResetStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
// eslint-disable-next-line no-useless-escape
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var PasswordReset = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(PasswordReset, _Component);
  var _super = _createSuper(PasswordReset);
  function PasswordReset(props) {
    var _this;
    (0, _classCallCheck2.default)(this, PasswordReset);
    _this = _super.call(this, props);
    _this.onSubmit = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {
        var publisherId, value, _this$props, onSuccess, t, response;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                publisherId = (0, _appConfigHelper.getData)('CLEENG_PUBLISHER_ID');
                value = _this.state.value;
                _this$props = _this.props, onSuccess = _this$props.onSuccess, t = _this$props.t;
                if (!_this.validateFields()) {
                  _context.next = 10;
                  break;
                }
                _this.setState({
                  processing: true
                });
                _context.next = 8;
                return (0, _resetPassword.default)(value, publisherId);
              case 8:
                response = _context.sent;
                if (response.errors.length) {
                  if (response.status === 429) {
                    _this.setState({
                      overloaded: true,
                      processing: false,
                      message: 'Server overloaded. Please try again later.'
                    });
                    setTimeout(function () {
                      _this.setState({
                        overloaded: false,
                        message: ''
                      });
                    }, 10 * 1000);
                  } else {
                    _this.setState({
                      processing: false,
                      message: t(response.errors[0])
                    });
                  }
                } else {
                  (0, _appConfigHelper.setData)('CLEENG_CUSTOMER_EMAIL', value);
                  onSuccess(value);
                }
              case 10:
                return _context.abrupt("return", true);
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    _this.state = {
      value: '',
      message: '',
      processing: false,
      overloaded: false
    };
    return _this;
  }
  (0, _createClass2.default)(PasswordReset, [{
    key: "validateFields",
    value: function validateFields() {
      var value = this.state.value;
      var t = this.props.t;
      var errorFields = {
        email: EMAIL_REGEX.test(value) ? '' : t('This address does not seem to have a normal email format.')
      };
      this.setState({
        message: errorFields.email
      });
      return !Object.keys(errorFields).find(function (key) {
        return errorFields[key] !== '';
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        value = _this$state.value,
        message = _this$state.message,
        processing = _this$state.processing,
        overloaded = _this$state.overloaded;
      var t = this.props.t;
      return /*#__PURE__*/_react.default.createElement(_PasswordResetStyled.PasswordResetWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_PasswordResetStyled.PasswordResetPageStyled, null, /*#__PURE__*/_react.default.createElement(_PasswordResetStyled.StyledTitle, null, t('Forgot your password?')), /*#__PURE__*/_react.default.createElement(_PasswordResetStyled.StyledMessage, null, t('Just enter your email address below and we will send you a link to reset your password')), /*#__PURE__*/_react.default.createElement(_PasswordResetStyled.FormStyled, {
        onSubmit: this.onSubmit,
        noValidate: true
      }, /*#__PURE__*/_react.default.createElement(_EmailInput.default, {
        label: t('Email'),
        error: message,
        value: value,
        onChange: function onChange(v) {
          return _this2.setState({
            value: v
          });
        }
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        type: "submit",
        theme: "confirm",
        size: "big",
        disabled: processing || overloaded
      }, processing ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Reset Password')))), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
    }
  }]);
  return PasswordReset;
}(_react.Component);
exports.PurePasswordReset = PasswordReset;
PasswordReset.propTypes = {
  onSuccess: _propTypes.default.func.isRequired,
  urlProps: _propTypes.default.shape({
    location: _propTypes.default.shape({
      search: _propTypes.default.string,
      state: _propTypes.default.shape({
        fromMyAccount: _propTypes.default.bool
      })
    })
  }),
  t: _propTypes.default.func
};
PasswordReset.defaultProps = {
  urlProps: {},
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(PasswordReset));
exports.default = _default;