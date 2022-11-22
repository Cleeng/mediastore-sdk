"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureLogin = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _Button = _interopRequireDefault(require("../Button"));
var _Header = _interopRequireDefault(require("../Header"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _offerIdHelper = _interopRequireDefault(require("../../util/offerIdHelper"));
var _publisherIdHelper = _interopRequireDefault(require("../../util/publisherIdHelper"));
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _LoginStyled = require("./LoginStyled");
var _LoginForm = _interopRequireDefault(require("./LoginForm"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Login = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Login, _Component);
  var _super = _createSuper(Login);
  function Login(props) {
    var _this;
    (0, _classCallCheck2.default)(this, Login);
    _this = _super.call(this, props);
    _this.setOfferId = function (value) {
      return _this.setState({
        offerId: value
      });
    };
    _this.setPublisherId = function (value) {
      return _this.setState({
        publisherId: value
      });
    };
    _this.state = {
      offerId: '',
      publisherId: '',
      emailChanged: false
    };
    return _this;
  }
  (0, _createClass2.default)(Login, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var urlProps = this.props.urlProps;
      if (urlProps.location) {
        (0, _offerIdHelper.default)(urlProps.location, this.setOfferId);
        (0, _publisherIdHelper.default)(urlProps.location, this.setPublisherId);
        if (urlProps.location.search.includes('emailChanged=true')) {
          this.setState({
            emailChanged: true
          });
        }
      } else {
        this.setOfferId((0, _appConfigHelper.getData)('CLEENG_OFFER_ID'));
        this.setPublisherId((0, _appConfigHelper.getData)('CLEENG_PUBLISHER_ID'));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
        offerId = _this$state.offerId,
        publisherId = _this$state.publisherId,
        emailChanged = _this$state.emailChanged;
      var _this$props = this.props,
        isMyAccount = _this$props.isMyAccount,
        onSuccess = _this$props.onSuccess,
        onPasswordResetClick = _this$props.onPasswordResetClick,
        onRegisterClick = _this$props.onRegisterClick,
        t = _this$props.t;
      return /*#__PURE__*/_react.default.createElement(_LoginStyled.LoginWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_LoginStyled.ContentWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        t: t,
        offerId: offerId,
        publisherId: publisherId,
        isMyAccount: isMyAccount,
        emailChanged: emailChanged,
        onSuccess: onSuccess
      }), !isMyAccount && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "secondary",
        size: "big",
        onClickFn: function onClickFn() {
          return onRegisterClick();
        }
      }, t('Go to register'))), !isMyAccount && /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "link",
        margin: "20px auto 0 auto",
        onClickFn: function onClickFn() {
          return onPasswordResetClick();
        }
      }, t('Forgot password?'))), /*#__PURE__*/_react.default.createElement(_Footer.default, {
        isCheckout: !isMyAccount
      }));
    }
  }]);
  return Login;
}(_react.Component);
exports.PureLogin = Login;
Login.propTypes = {
  urlProps: _propTypes.default.shape({
    location: _propTypes.default.shape({
      search: _propTypes.default.string
    })
  }),
  isMyAccount: _propTypes.default.bool,
  onSuccess: _propTypes.default.func,
  onRegisterClick: _propTypes.default.func,
  onPasswordResetClick: _propTypes.default.func,
  t: _propTypes.default.func
};
Login.defaultProps = {
  urlProps: {},
  isMyAccount: false,
  onSuccess: function onSuccess() {},
  onRegisterClick: function onRegisterClick() {},
  onPasswordResetClick: function onPasswordResetClick() {},
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Login));
exports.default = _default;