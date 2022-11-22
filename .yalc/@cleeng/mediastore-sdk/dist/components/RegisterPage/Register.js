"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureRegister = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _LoginStyled = require("../LoginPage/LoginStyled");
var _Button = _interopRequireDefault(require("../Button"));
var _Header = _interopRequireDefault(require("../Header"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _publisherIdHelper = _interopRequireDefault(require("../../util/publisherIdHelper"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _RegisterForm = _interopRequireDefault(require("./RegisterForm"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Register = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Register, _Component);
  var _super = _createSuper(Register);
  function Register(props) {
    var _this;
    (0, _classCallCheck2.default)(this, Register);
    _this = _super.call(this, props);
    _this.setPublisherId = function (value) {
      return _this.setState({
        publisherId: value
      });
    };
    _this.state = {
      publisherId: null
    };
    return _this;
  }
  (0, _createClass2.default)(Register, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var urlProps = this.props.urlProps;
      if (urlProps.location) {
        (0, _publisherIdHelper.default)(urlProps.location, this.setPublisherId);
      } else {
        this.setPublisherId((0, _appConfigHelper.getData)('CLEENG_PUBLISHER_ID'));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var publisherId = this.state.publisherId;
      var _this$props = this.props,
        t = _this$props.t,
        onSuccess = _this$props.onSuccess,
        onHaveAccountClick = _this$props.onHaveAccountClick;
      return /*#__PURE__*/_react.default.createElement(_LoginStyled.LoginWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_LoginStyled.ContentWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        t: t,
        publisherId: publisherId,
        onSuccess: onSuccess
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "secondary",
        size: "big",
        onClickFn: function onClickFn() {
          return onHaveAccountClick();
        }
      }, t('Have an account?'))), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
    }
  }]);
  return Register;
}(_react.Component);
exports.PureRegister = Register;
Register.propTypes = {
  urlProps: _propTypes.default.shape({
    location: _propTypes.default.shape({
      search: _propTypes.default.string
    })
  }),
  onSuccess: _propTypes.default.func,
  onHaveAccountClick: _propTypes.default.func,
  t: _propTypes.default.func
};
Register.defaultProps = {
  urlProps: {},
  onSuccess: function onSuccess() {},
  onHaveAccountClick: function onHaveAccountClick() {},
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Register));
exports.default = _default;