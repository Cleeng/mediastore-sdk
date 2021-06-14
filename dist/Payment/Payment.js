"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _api = require("api");

var _Button = _interopRequireDefault(require("components/Button"));

var _Adyen = _interopRequireDefault(require("components/Adyen"));

var _SectionHeader = _interopRequireDefault(require("components/SectionHeader"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _appConfigHelper = require("util/appConfigHelper");

var _PaymentMethodButton = _interopRequireDefault(require("components/PaymentMethodButton"));

var _auth = _interopRequireDefault(require("services/auth"));

var _PaymentStyled = require("./PaymentStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Payment = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Payment, _Component);

  var _super = (0, _createSuper2.default)(Payment);

  function Payment(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Payment);
    _this = _super.call(this, props);

    _this.onAdyenSubmit = function (_ref) {
      var card = _ref.data.paymentMethod;
      var _this$props = _this.props,
          onPaymentComplete = _this$props.onPaymentComplete,
          t = _this$props.t;

      _this.setState({
        generalError: '',
        isLoading: true
      });

      (0, _api.submitPayment)(card).then(function (paymentReponse) {
        if (paymentReponse.errors.length) {
          var notSupportedMethod = paymentReponse.errors[0].includes('Payment details are not supported');

          if (notSupportedMethod) {
            _this.setState({
              generalError: t('Payment method not supported. Try different payment method'),
              isLoading: false
            });
          } else {
            _this.setState({
              generalError: t('The payment failed. Please try again.'),
              isLoading: false
            });
          }
        } else {
          onPaymentComplete();
        }
      });
    };

    _this.clearError = function () {
      _this.setState({
        generalError: ''
      });
    };

    _this.choosePaymentMethod = function (methodId, methodName) {
      var orderId = (0, _appConfigHelper.getData)('CLEENG_ORDER_ID');
      (0, _appConfigHelper.setData)('CLEENG_PAYMENT_METHOD_ID', methodId);

      if (orderId) {
        (0, _api.updateOrder)(orderId, {
          paymentMethodId: methodId
        }).then(function (response) {
          var updatePriceBreakdown = _this.props.updatePriceBreakdown;

          if (response.errors.length && response.errors[0].includes('JWT')) {
            _auth.default.logout();
          }

          updatePriceBreakdown(response.responseData.order);
        });
      }

      if (methodName === 'paypal') {
        _this.setState({
          isPayPal: true
        });
      } else {
        _this.setState({
          isPayPal: false
        });
      }
    };

    _this.submitPayPal = function () {
      var t = _this.props.t;

      _this.setState({
        isLoading: true
      });

      (0, _api.submitPayPalPayment)().then(function (resp) {
        window.location.href = resp.responseData.redirectUrl;
      }).catch(function () {
        return _this.setState({
          generalError: t('The payment failed. Please try again.'),
          isLoading: false
        });
      });
    };

    _this.finishTransaction = function () {
      var _this$props2 = _this.props,
          onPaymentComplete = _this$props2.onPaymentComplete,
          t = _this$props2.t;

      _this.setState({
        isLoading: true,
        generalError: ''
      });

      (0, _api.submitPaymentWithoutDetails)().then(function (paymentReponse) {
        if (paymentReponse.errors.length) {
          _this.setState({
            generalError: t('The payment failed. Please try again.'),
            isLoading: false
          });
        } else {
          onPaymentComplete();
        }
      });
    };

    _this.state = {
      isPaymentFormDisplayed: false,
      isPayPal: false,
      isLoading: false,
      paymentMethods: [],
      generalError: ''
    };
    return _this;
  }

  (0, _createClass2.default)(Payment, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var t, response, paymentMethods;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                t = this.props.t;
                _context.prev = 1;
                _context.next = 4;
                return (0, _api.getPaymentMethods)();

              case 4:
                response = _context.sent;
                paymentMethods = response.responseData.paymentMethods;

                if (paymentMethods) {
                  if (!paymentMethods.length) {
                    this.setState({
                      generalError: t('Payment methods are not defined')
                    });
                  } else {
                    this.setState({
                      paymentMethods: response.responseData.paymentMethods
                    });
                    (0, _appConfigHelper.setData)('CLEENG_PAYMENT_METHOD_ID', response.responseData.paymentMethods[0].id);
                  }
                } else if (!response.errors.length) {
                  this.setState({
                    generalError: t('Cannot fetch payment methods')
                  });
                }

                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                this.setState({
                  generalError: t('Cannot fetch payment methods')
                });

              case 12:
                if (window.location.search && window.location.search.includes('message')) {
                  this.setState({
                    generalError: t('Your payment was not processed. Please, try again')
                  });
                }

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          isPaymentDetailsRequired = _this$props3.isPaymentDetailsRequired,
          t = _this$props3.t;
      var _this$state = this.state,
          isPaymentFormDisplayed = _this$state.isPaymentFormDisplayed,
          generalError = _this$state.generalError,
          paymentMethods = _this$state.paymentMethods,
          isPayPal = _this$state.isPayPal,
          isLoading = _this$state.isLoading;
      return /*#__PURE__*/_react.default.createElement(_PaymentStyled.PaymentStyled, null, isPaymentDetailsRequired ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SectionHeader.default, {
        center: true
      }, t('Purchase using')), /*#__PURE__*/_react.default.createElement(_PaymentStyled.MethodsWrapperStyled, null, paymentMethods.map(function (method) {
        return method.methodName !== 'manual' && /*#__PURE__*/_react.default.createElement(_PaymentMethodButton.default, {
          key: method.id,
          methodName: method.methodName,
          onClickFn: function onClickFn() {
            _this2.setState({
              isPaymentFormDisplayed: true
            });

            _this2.choosePaymentMethod(method.id, method.methodName);
          }
        });
      })), generalError && /*#__PURE__*/_react.default.createElement(_PaymentStyled.PaymentErrorStyled, null, generalError), isPayPal && /*#__PURE__*/_react.default.createElement(_PaymentStyled.PayPalWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_PaymentStyled.PayPalTextStyled, null, t('Click ‘Continue with PayPal’ to complete your purchase.')), /*#__PURE__*/_react.default.createElement(_Button.default, {
        type: "button",
        theme: "payment",
        onClickFn: this.submitPayPal
      }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Continue with PayPal'))), isPaymentFormDisplayed && !isPayPal && /*#__PURE__*/_react.default.createElement(_Adyen.default, {
        onSubmit: this.onAdyenSubmit,
        onChange: this.clearError,
        isPaymentProcessing: isLoading
      })) : /*#__PURE__*/_react.default.createElement(_Button.default, {
        onClickFn: this.finishTransaction,
        theme: "confirm",
        width: "250px",
        size: "big",
        margin: "20px auto 0 auto"
      }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Complete purchase')));
    }
  }]);
  return Payment;
}(_react.Component);

Payment.defaultProps = {
  isPaymentDetailsRequired: true,
  updatePriceBreakdown: function updatePriceBreakdown() {},
  t: function t(k) {
    return k;
  }
};
var _default = Payment;
exports.default = _default;