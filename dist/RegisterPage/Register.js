"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureRegister = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _google = _interopRequireDefault(require("assets/images/google.png"));

var _fb = _interopRequireDefault(require("assets/images/fb.svg"));

var _ErrorPage = _interopRequireDefault(require("components/ErrorPage"));

var _BackButton = _interopRequireDefault(require("components/BackButton"));

var _LoginStyled = require("components/LoginPage/LoginStyled");

var _Button = _interopRequireDefault(require("components/Button"));

var _Header = _interopRequireDefault(require("components/Header"));

var _Footer = _interopRequireDefault(require("components/Footer"));

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _publisherIdHelper = _interopRequireDefault(require("util/publisherIdHelper"));

var _offerIdHelper = _interopRequireDefault(require("util/offerIdHelper"));

var _appConfigHelper = require("util/appConfigHelper");

var _RegisterForm = _interopRequireDefault(require("./RegisterForm"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Register = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Register, _Component);

  var _super = (0, _createSuper2.default)(Register);

  function Register(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Register);
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
      offerId: null,
      isOfferError: false,
      publisherId: null
    };
    return _this;
  }

  (0, _createClass2.default)(Register, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var urlProps = this.props.urlProps;
      (0, _offerIdHelper.default)(urlProps.location, this.setOfferId);
      (0, _publisherIdHelper.default)(urlProps.location, this.setPublisherId);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isOfferError = _this$state.isOfferError,
          offerId = _this$state.offerId,
          publisherId = _this$state.publisherId;
      var t = this.props.t;
      return isOfferError ? /*#__PURE__*/_react.default.createElement(_ErrorPage.default, {
        type: "offerNotExist",
        resetError: function resetError() {
          return _this2.setOfferError();
        }
      }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Header.default, null, /*#__PURE__*/_react.default.createElement(_BackButton.default, null)), /*#__PURE__*/_react.default.createElement(_LoginStyled.ContentWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        t: t,
        offerId: offerId,
        publisherId: publisherId,
        setOfferError: this.setOfferError
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        isLink: true,
        to: {
          pathname: '/login'
        },
        theme: "secondary",
        size: "big"
      }, t('Have an account?')), !(0, _appConfigHelper.isHosted)() && /*#__PURE__*/_react.default.createElement(_LoginStyled.SocialStyled, null, /*#__PURE__*/_react.default.createElement(_LoginStyled.SeparatorStyled, null, t('Or sign up with')), /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "simple",
        fontWeight: "500",
        label: "Sign up with Facebook",
        icon: _fb.default
      }, "Facebook"), /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "simple",
        fontWeight: "500",
        label: "Sign up with Google",
        icon: _google.default
      }, "Google"))), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
    }
  }]);
  return Register;
}(_react.Component);

exports.PureRegister = Register;
Register.defaultProps = {
  urlProps: {},
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Register));

exports.default = _default;