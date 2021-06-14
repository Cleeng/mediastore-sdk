"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureLogin = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _ErrorPage = _interopRequireDefault(require("components/ErrorPage"));

var _google = _interopRequireDefault(require("assets/images/google.png"));

var _fb = _interopRequireDefault(require("assets/images/fb.svg"));

var _Button = _interopRequireDefault(require("components/Button"));

var _Header = _interopRequireDefault(require("components/Header"));

var _Footer = _interopRequireDefault(require("components/Footer"));

var _offerIdHelper = _interopRequireDefault(require("util/offerIdHelper"));

var _publisherIdHelper = _interopRequireDefault(require("util/publisherIdHelper"));

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _appConfigHelper = require("util/appConfigHelper");

var _LoginStyled = require("./LoginStyled");

var _LoginForm = _interopRequireDefault(require("./LoginForm"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Login = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Login, _Component);

  var _super = (0, _createSuper2.default)(Login);

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

    _this.setOfferError = function (value) {
      return _this.setState({
        isOfferError: value
      });
    };

    _this.state = {
      offerId: '',
      publisherId: '',
      isOfferError: false,
      emailChanged: false
    };
    return _this;
  }

  (0, _createClass2.default)(Login, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var urlProps = this.props.urlProps;
      (0, _offerIdHelper.default)(urlProps.location, this.setOfferId);
      (0, _publisherIdHelper.default)(urlProps.location, this.setPublisherId);

      if (urlProps.location.search.includes('emailChanged=true')) {
        this.setState({
          emailChanged: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isOfferError = _this$state.isOfferError,
          offerId = _this$state.offerId,
          publisherId = _this$state.publisherId,
          emailChanged = _this$state.emailChanged;
      var _this$props = this.props,
          isMyAccount = _this$props.isMyAccount,
          t = _this$props.t;
      return isOfferError ? /*#__PURE__*/_react.default.createElement(_ErrorPage.default, {
        type: "offerNotExist",
        resetError: function resetError() {
          return _this2.setOfferError(false);
        }
      }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_LoginStyled.ContentWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        t: t,
        offerId: offerId,
        publisherId: publisherId,
        setOfferError: this.setOfferError,
        isMyAccount: isMyAccount,
        emailChanged: emailChanged
      }), !isMyAccount && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        isLink: true,
        to: {
          pathname: '/register'
        },
        theme: "secondary",
        size: "big"
      }, t('Go to register')), !(0, _appConfigHelper.isHosted)() && /*#__PURE__*/_react.default.createElement(_LoginStyled.SocialStyled, null, /*#__PURE__*/_react.default.createElement(_LoginStyled.SeparatorStyled, null, t('Or sign in with')), /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "simple",
        fontWeight: "500",
        label: t('Sign in with Facebook'),
        icon: _fb.default
      }, "Facebook"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "simple",
        fontWeight: "500",
        label: t('Sign in with Google'),
        icon: _google.default
      }, "Google"))), /*#__PURE__*/_react.default.createElement(_Button.default, {
        isLink: true,
        to: {
          pathname: '/reset-password',
          fromMyAccount: isMyAccount
        },
        theme: "link",
        margin: "20px auto"
      }, t('Forgot password?'))), /*#__PURE__*/_react.default.createElement(_Footer.default, {
        isCheckout: !isMyAccount
      }));
    }
  }]);
  return Login;
}(_react.Component);

exports.PureLogin = Login;
Login.defaultProps = {
  urlProps: {},
  isMyAccount: false,
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Login));

exports.default = _default;