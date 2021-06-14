"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureAdyen = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("components/Button"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _AdyenStyled = require("./AdyenStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var COMPONENT_CONTAINER_ID = 'component-container';
var PAYMENT_METHOD_CARD = 'card';
var ADYEN_ENV = ENVIRONMENT_CONFIGURATION.REACT_ENV === 'production' ? 'live' : 'test';
var ADYEN_STYLESHEET_HREF = "https://checkoutshopper-".concat(ADYEN_ENV, ".adyen.com/checkoutshopper/sdk/3.11.4/adyen.css");
var ADYEN_SCRIPT_HREF = "https://checkoutshopper-".concat(ADYEN_ENV, ".adyen.com/checkoutshopper/sdk/3.10.1/adyen.js");

var Adyen = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Adyen, _Component);

  var _super = (0, _createSuper2.default)(Adyen);

  function Adyen(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Adyen);
    _this = _super.call(this, props);

    _this.loadAdyenStylesheet = function () {
      return new Promise(function (resolve, reject) {
        var linkEl = document.createElement('link');
        linkEl.onload = resolve;
        linkEl.onerror = reject;
        linkEl.rel = 'stylesheet';
        linkEl.href = ADYEN_STYLESHEET_HREF;
        document.body.append(linkEl);
      });
    };

    _this.loadAdyenScript = function () {
      return new Promise(function (resolve, reject) {
        var scriptEl = document.createElement('script');
        scriptEl.onload = resolve;
        scriptEl.onerror = reject;
        scriptEl.src = ADYEN_SCRIPT_HREF;
        document.body.append(scriptEl);
      });
    };

    _this.renderCheckout = function () {
      var _this$props = _this.props,
          onSubmit = _this$props.onSubmit,
          onChange = _this$props.onChange;
      var configuration = {
        showPayButton: false,
        environment: ADYEN_ENV,
        clientKey: ENVIRONMENT_CONFIGURATION.ADYEN_CLIENT_KEY,
        onSubmit: onSubmit,
        onChange: onChange
      };
      _this.checkout = new window.AdyenCheckout(configuration).create(PAYMENT_METHOD_CARD).mount("#".concat(COMPONENT_CONTAINER_ID));
    };

    _this.state = {
      isLoaded: false
    };
    return _this;
  }

  (0, _createClass2.default)(Adyen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (window.AdyenCheckout === undefined) {
        this.loadAdyenStylesheet().then(this.loadAdyenScript).then(this.renderCheckout).then(function () {
          _this2.setState({
            isLoaded: true
          });
        });
      } else {
        this.renderCheckout();
        this.setState({
          isLoaded: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var isLoaded = this.state.isLoaded;
      var _this$props2 = this.props,
          t = _this$props2.t,
          isPaymentProcessing = _this$props2.isPaymentProcessing;
      return /*#__PURE__*/_react.default.createElement(_AdyenStyled.AdyenStyled, null, /*#__PURE__*/_react.default.createElement("div", {
        id: COMPONENT_CONTAINER_ID
      }), isLoaded && /*#__PURE__*/_react.default.createElement(_AdyenStyled.ConfirmButtonStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "confirm",
        size: "big",
        onClickFn: function onClickFn() {
          return _this3.checkout.submit();
        },
        disabled: isPaymentProcessing
      }, isPaymentProcessing ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Confirm'))));
    }
  }]);
  return Adyen;
}(_react.Component);

exports.PureAdyen = Adyen;
Adyen.defaultProps = {
  t: function t(k) {
    return k;
  },
  onChange: function onChange() {},
  isPaymentProcessing: false
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Adyen));

exports.default = _default;