"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _LoginPage = _interopRequireDefault(require("../LoginPage"));
var _RegisterPage = _interopRequireDefault(require("../RegisterPage"));
var _PasswordReset = _interopRequireDefault(require("../PasswordReset"));
var _Capture = _interopRequireDefault(require("../Capture/Capture"));
var _CheckoutConsents = _interopRequireDefault(require("../CheckoutConsents"));
var _OfferContainer = _interopRequireDefault(require("../../containers/OfferContainer"));
var _ThankYouPage = _interopRequireDefault(require("../ThankYouPage"));
var _auth = _interopRequireDefault(require("../../services/auth"));
var _PasswordResetSuccess = _interopRequireDefault(require("../PasswordResetSuccess"));
var _appConfigHelper = require("../../util/appConfigHelper");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CheckoutSteps = {
  LOGIN: {
    stepNumber: 0,
    nextStep: 2
  },
  REGISTER: {
    stepNumber: 1,
    nextStep: 2
  },
  CAPTURE: {
    stepNumber: 2,
    nextStep: 3
  },
  CONSENTS: {
    stepNumber: 3,
    nextStep: 4
  },
  PURCHASE: {
    stepNumber: 4,
    nextStep: 5
  },
  PASSWORD_SUCCESS: {
    stepNumber: 6,
    nextStep: 7
  }
};
var Checkout = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Checkout, _Component);
  var _super = _createSuper(Checkout);
  function Checkout(props) {
    var _this;
    (0, _classCallCheck2.default)(this, Checkout);
    _this = _super.call(this, props);
    _this.goToStep = function (step) {
      _this.setState({
        currentStep: step
      });
    };
    _this.state = {
      currentStep: 0
    };
    return _this;
  }
  (0, _createClass2.default)(Checkout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (_auth.default.isLogged()) {
        this.setState({
          currentStep: 3
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var currentStep = this.state.currentStep;
      var _this$props = this.props,
        _onSuccess = _this$props.onSuccess,
        offerId = _this$props.offerId,
        availablePaymentMethods = _this$props.availablePaymentMethods,
        resetPasswordCallback = _this$props.resetPasswordCallback;
      switch (currentStep) {
        case 0:
          return /*#__PURE__*/_react.default.createElement(_LoginPage.default, {
            onSuccess: function onSuccess() {
              return _this2.goToStep(CheckoutSteps.LOGIN.nextStep);
            },
            onRegisterClick: function onRegisterClick() {
              return _this2.goToStep(1);
            },
            onPasswordResetClick: function onPasswordResetClick() {
              return _this2.goToStep(6);
            }
          });
        case 1:
          return /*#__PURE__*/_react.default.createElement(_RegisterPage.default, {
            onSuccess: function onSuccess() {
              return _this2.goToStep(CheckoutSteps.REGISTER.nextStep);
            },
            onHaveAccountClick: function onHaveAccountClick() {
              return _this2.goToStep(0);
            }
          });
        case 2:
          return /*#__PURE__*/_react.default.createElement(_Capture.default, {
            onSuccess: function onSuccess() {
              return _this2.goToStep(CheckoutSteps.CAPTURE.nextStep);
            }
          });
        case 3:
          return /*#__PURE__*/_react.default.createElement(_CheckoutConsents.default, {
            onSuccess: function onSuccess() {
              return _this2.goToStep(CheckoutSteps.CONSENTS.nextStep);
            }
          });
        case 4:
          return /*#__PURE__*/_react.default.createElement(_OfferContainer.default, {
            offerId: offerId,
            availablePaymentMethods: availablePaymentMethods,
            onSuccess: function onSuccess() {
              return _this2.goToStep(CheckoutSteps.PURCHASE.nextStep);
            }
          });
        case 5:
          return /*#__PURE__*/_react.default.createElement(_ThankYouPage.default, {
            onSuccess: function onSuccess() {
              return _onSuccess();
            }
          });
        case 6:
          return /*#__PURE__*/_react.default.createElement(_PasswordReset.default, {
            onSuccess: function onSuccess() {
              return _this2.goToStep(CheckoutSteps.PASSWORD_SUCCESS.nextStep);
            }
          });
        case 7:
          return /*#__PURE__*/_react.default.createElement(_PasswordResetSuccess.default, {
            email: (0, _appConfigHelper.getData)('CLEENG_CUSTOMER_EMAIL'),
            resetPasswordCallback: resetPasswordCallback
          });
        default:
          return null;
      }
    }
  }]);
  return Checkout;
}(_react.Component);
Checkout.propTypes = {
  offerId: _propTypes.default.string,
  availablePaymentMethods: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.number,
    methodName: _propTypes.default.string,
    default: _propTypes.default.bool
  })),
  onSuccess: _propTypes.default.func,
  resetPasswordCallback: _propTypes.default.func
};
Checkout.defaultProps = {
  offerId: null,
  availablePaymentMethods: null,
  onSuccess: function onSuccess() {},
  resetPasswordCallback: function resetPasswordCallback() {}
};
var _default = Checkout;
exports.default = _default;