"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureEditPassword = void 0;
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
var _jwtDecode2 = _interopRequireDefault(require("jwt-decode"));
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _resetPassword = _interopRequireDefault(require("../../api/Auth/resetPassword"));
var _Button = _interopRequireDefault(require("../Button"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _auth = _interopRequireDefault(require("../../services/auth"));
var _InnerPopupWrapper = _interopRequireDefault(require("../InnerPopupWrapper"));
var _InnerPopupWrapperStyled = require("../InnerPopupWrapper/InnerPopupWrapperStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var EditPassword = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2.default)(EditPassword, _PureComponent);
  var _super = _createSuper(EditPassword);
  function EditPassword(props) {
    var _this;
    (0, _classCallCheck2.default)(this, EditPassword);
    _this = _super.call(this, props);
    _this.renderNextStep = function () {
      _this.setState(function (prevState) {
        return {
          step: prevState.step + 1
        };
      });
    };
    _this.logout = function () {
      var hideInnerPopup = _this.props.hideInnerPopup;
      hideInnerPopup();
      _auth.default.logout();
    };
    _this.resetPassword = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var customerEmail, _jwtDecode, publisherId, response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              customerEmail = _this.props.customerEmail;
              _jwtDecode = (0, _jwtDecode2.default)((0, _appConfigHelper.getData)('CLEENG_AUTH_TOKEN')), publisherId = _jwtDecode.publisherId;
              _this.setState({
                isLoading: true
              });
              _context.prev = 3;
              _context.next = 6;
              return (0, _resetPassword.default)(customerEmail, String(publisherId));
            case 6:
              response = _context.sent;
              if (!response.errors.length) {
                _this.renderNextStep();
                _this.setState({
                  isLoading: false
                });
              } else {
                _this.setState({
                  isLoading: false,
                  isError: true
                });
              }
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              _this.setState({
                isLoading: false,
                isError: true
              });
            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 10]]);
    }));
    _this.state = {
      step: 1,
      isLoading: false,
      isError: false
    };
    return _this;
  }
  (0, _createClass2.default)(EditPassword, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
        step = _this$state.step,
        isLoading = _this$state.isLoading,
        isError = _this$state.isError;
      var _this$props = this.props,
        t = _this$props.t,
        customerEmail = _this$props.customerEmail,
        hideInnerPopup = _this$props.hideInnerPopup;
      return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
        steps: 2,
        popupTitle: t('Edit Password'),
        isError: isError,
        currentStep: step
      }, step === 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, {
        step: step
      }, t('Edit Password')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, {
        step: step
      }, t("If you want to edit your password, click 'YES, Reset' to receive password reset instruction on your mail"), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.MailStyled, null, " ", customerEmail, "."))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "simple",
        onClickFn: function onClickFn() {
          return hideInnerPopup();
        }
      }, t('No, thanks')), /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "confirm",
        onClickFn: this.resetPassword
      }, isLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) || t('Yes, Reset')))), step === 2 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, {
        step: step
      }, t('Email has been sent!')), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, {
        step: step
      }, t('Please check your inbox and check the Instruction to change a password'))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "confirm",
        onClickFn: this.logout
      }, isLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) || t('Thanks!')))));
    }
  }]);
  return EditPassword;
}(_react.PureComponent);
exports.PureEditPassword = EditPassword;
EditPassword.propTypes = {
  hideInnerPopup: _propTypes.default.func.isRequired,
  customerEmail: _propTypes.default.string.isRequired,
  t: _propTypes.default.func
};
EditPassword.defaultProps = {
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(EditPassword));
exports.default = _default;