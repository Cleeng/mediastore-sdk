"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PurePayment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _api = require("../../api");
var _Button = _interopRequireDefault(require("../Button"));
var _Adyen = _interopRequireDefault(require("../Adyen"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _auth = _interopRequireDefault(require("../../services/auth"));
var _PaymentStyled = require("./PaymentStyled");
var _Payment = require("./Payment.utils");
var _eventDispatcher = _interopRequireWildcard(require("../../util/eventDispatcher"));
var _LegalNote = _interopRequireDefault(require("./LegalNote/LegalNote"));
var _PayPal = _interopRequireDefault(require("./PayPal/PayPal"));
var _DropInSection = _interopRequireDefault(require("./DropInSection/DropInSection"));
var _AdyenStyled = require("../Adyen/AdyenStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PaypalLogo = function PaypalLogo(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("path", {
    d: "M13.822 1.805h-.939a.271.271 0 0 0-.224.119l-1.3 1.909-.549-1.834a.272.272 0 0 0-.26-.193h-.921a.163.163 0 0 0-.154.215l1.034 3.036-.973 1.373a.163.163 0 0 0 .133.257h.938a.273.273 0 0 0 .223-.116l3.124-4.509a.163.163 0 0 0-.134-.255Zm-6.28 1.819a1.042 1.042 0 0 1-1.055.892.724.724 0 0 1-.774-.909 1.046 1.046 0 0 1 1.047-.9.787.787 0 0 1 .623.255.8.8 0 0 1 .159.661Zm1.3-1.819h-.935a.163.163 0 0 0-.161.137l-.041.261-.065-.095a1.331 1.331 0 0 0-1.1-.392 2.149 2.149 0 0 0-2.086 1.88 1.764 1.764 0 0 0 .348 1.436 1.462 1.462 0 0 0 1.177.475 1.789 1.789 0 0 0 1.294-.534l-.042.26a.163.163 0 0 0 .161.188h.837a.271.271 0 0 0 .268-.229l.505-3.2a.163.163 0 0 0-.161-.188Zm-5.609.022c-.107.7-.642.7-1.159.7h-.292l.206-1.308a.162.162 0 0 1 .161-.137h.135c.352 0 .685 0 .857.2a.652.652 0 0 1 .095.544ZM3.008-.001H1.059a.271.271 0 0 0-.268.229l-.789 5a.163.163 0 0 0 .161.188h.932a.271.271 0 0 0 .268-.229l.213-1.35a.271.271 0 0 1 .268-.229h.618a2 2 0 0 0 2.22-1.85 1.5 1.5 0 0 0-.253-1.26 1.809 1.809 0 0 0-1.422-.5Zm20.856.138-.8 5.1a.163.163 0 0 0 .161.188h.804a.271.271 0 0 0 .268-.229l.79-5a.163.163 0 0 0-.161-.188h-.9a.163.163 0 0 0-.161.138Zm-2.4 3.487a1.042 1.042 0 0 1-1.055.892.724.724 0 0 1-.774-.909 1.046 1.046 0 0 1 1.047-.9.787.787 0 0 1 .623.255.8.8 0 0 1 .159.661Zm1.3-1.819h-.935a.163.163 0 0 0-.161.137l-.041.261-.065-.095a1.331 1.331 0 0 0-1.1-.392 2.149 2.149 0 0 0-2.086 1.88 1.764 1.764 0 0 0 .348 1.436 1.462 1.462 0 0 0 1.177.475 1.789 1.789 0 0 0 1.294-.534l-.042.26a.163.163 0 0 0 .161.188h.842a.271.271 0 0 0 .268-.229l.505-3.2a.163.163 0 0 0-.161-.188Zm-5.609.022c-.107.7-.642.7-1.159.7h-.294l.206-1.308a.162.162 0 0 1 .161-.137h.135c.352 0 .685 0 .857.2a.653.653 0 0 1 .095.544ZM16.929 0H14.98a.271.271 0 0 0-.268.229l-.789 5a.163.163 0 0 0 .161.188h1a.19.19 0 0 0 .187-.16l.224-1.419a.271.271 0 0 1 .268-.229h.618a2 2 0 0 0 2.221-1.855 1.5 1.5 0 0 0-.249-1.259 1.809 1.809 0 0 0-1.422-.5Z",
    opacity: ".5"
  }));
};
PaypalLogo.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "25.092",
  height: "6.687"
};
var Payment = function Payment(_ref) {
  var _React$createElement;
  var t = _ref.t,
    isPaymentDetailsRequired = _ref.isPaymentDetailsRequired,
    availablePaymentMethods = _ref.availablePaymentMethods,
    onPaymentComplete = _ref.onPaymentComplete,
    updatePriceBreakdown = _ref.updatePriceBreakdown,
    order = _ref.order,
    period = _ref.period;
  var _useState = (0, _react.useState)(true),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isPaymentFormDisplayed = _useState2[0],
    setIsPaymentFormDisplayed = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isPayPal = _useState4[0],
    setIsPayPal = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    isLoading = _useState6[0],
    setIsLoading = _useState6[1];
  var _useState7 = (0, _react.useState)([]),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    validPaymentMethods = _useState8[0],
    setValidPaymentMethods = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    generalError = _useState10[0],
    setGeneralError = _useState10[1];
  var _useState11 = (0, _react.useState)(''),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    selectedPaymentMethod = _useState12[0],
    setSelectedPaymentMethod = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
    dropInInstance = _useState14[0],
    setDropInInstance = _useState14[1];
  var validatePaymentMethods = function validatePaymentMethods(paymentMethods) {
    var showError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (!paymentMethods) return [];
    return paymentMethods.filter(function (_ref2) {
      var methodName = _ref2.methodName,
        paymentGateway = _ref2.paymentGateway,
        id = _ref2.id;
      if (showError) {
        // eslint-disable-next-line no-console
        console.error("Payment method not supported (id: ".concat(id, ")"));
        return false;
      }
      return _Payment.supportedPaymentMethods.includes(methodName) && _Payment.supportedPaymentGateways.includes(paymentGateway);
    });
  };
  var choosePaymentMethod = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(methodId, paymentGateway) {
      var orderId, _errors$, _yield$updateOrder, errors, responseData;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setGeneralError('');
              orderId = (0, _appConfigHelper.getData)('CLEENG_ORDER_ID');
              if (!orderId) {
                _context.next = 10;
                break;
              }
              _context.next = 5;
              return (0, _api.updateOrder)(orderId, {
                paymentMethodId: methodId
              });
            case 5:
              _yield$updateOrder = _context.sent;
              errors = _yield$updateOrder.errors;
              responseData = _yield$updateOrder.responseData;
              if ((_errors$ = errors[0]) !== null && _errors$ !== void 0 && _errors$.includes('JWT')) {
                _auth.default.logout();
              }
              updatePriceBreakdown(responseData.order);
            case 10:
              setIsPayPal(paymentGateway === 'paypal');
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function choosePaymentMethod(_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var selectPaymentMethod = function selectPaymentMethod(gateway) {
    setSelectedPaymentMethod(gateway);
    choosePaymentMethod(validPaymentMethods.find(function (_ref4) {
      var paymentGateway = _ref4.paymentGateway;
      return paymentGateway === gateway;
    }).id, gateway);
  };
  var isGatewayAvailable = function isGatewayAvailable(gateway) {
    return !!validPaymentMethods.find(function (_ref5) {
      var paymentGateway = _ref5.paymentGateway;
      return paymentGateway === gateway;
    });
  };
  var handlePayPalError = function handlePayPalError() {
    var search = window.location.search;
    if (search !== null && search !== void 0 && search.includes('message')) {
      setGeneralError(t('Your payment was not processed. Please, try again'));
    }
  };
  var selectAvailablePaymentMethod = function selectAvailablePaymentMethod(availableValidPaymentMethods) {
    setValidPaymentMethods(availableValidPaymentMethods);
    var defaultMethod = availableValidPaymentMethods.find(function (method) {
      return method.default;
    });
    if (defaultMethod) {
      setIsPaymentFormDisplayed(true);
      setSelectedPaymentMethod(defaultMethod.paymentGateway);
      choosePaymentMethod(defaultMethod.id, defaultMethod.paymentGateway);
    }
    if (availableValidPaymentMethods.length === 1) {
      var _availableValidPaymen = (0, _slicedToArray2.default)(availableValidPaymentMethods, 1),
        paymentMethod = _availableValidPaymen[0];
      setIsPaymentFormDisplayed(true);
      setSelectedPaymentMethod(paymentMethod.paymentGateway);
      choosePaymentMethod(paymentMethod.id, paymentMethod.paymentGateway);
    }
    console.log('?', availableValidPaymentMethods[0].paymentGateway);
    setSelectedPaymentMethod(availableValidPaymentMethods[0].paymentGateway);
  };
  var fetchPaymentMethods = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var response, paymentMethods, validMethodsFromResponse, _validMethodsFromResp, paymentMethod;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _api.getPaymentMethods)();
            case 2:
              response = _context2.sent;
              paymentMethods = response.responseData.paymentMethods;
              validMethodsFromResponse = validatePaymentMethods(paymentMethods, false);
              console.log(validMethodsFromResponse);
              if (!response.errors.length) {
                _context2.next = 9;
                break;
              }
              setGeneralError(t('Cannot fetch payment methods'));
              return _context2.abrupt("return");
            case 9:
              if (validMethodsFromResponse !== null && validMethodsFromResponse !== void 0 && validMethodsFromResponse.length) {
                _context2.next = 12;
                break;
              }
              // TODO: Check if optional chaining is available
              setGeneralError(t('Payment methods are not defined'));
              return _context2.abrupt("return");
            case 12:
              if (validMethodsFromResponse.length === 1) {
                _validMethodsFromResp = (0, _slicedToArray2.default)(validMethodsFromResponse, 1), paymentMethod = _validMethodsFromResp[0];
                setIsPaymentFormDisplayed(true);
                setSelectedPaymentMethod(paymentMethod.paymentGateway);
                choosePaymentMethod(paymentMethod.id, paymentMethod.paymentGateway);
              }
              setSelectedPaymentMethod(validMethodsFromResponse[0].paymentGateway);
              setValidPaymentMethods(validMethodsFromResponse);
            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function fetchPaymentMethods() {
      return _ref6.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    var availableValidPaymentMethods = validatePaymentMethods(availablePaymentMethods);
    if (availableValidPaymentMethods.length) {
      selectAvailablePaymentMethod(availableValidPaymentMethods);
      return;
    }
    fetchPaymentMethods();
    handlePayPalError();
  }, []);
  var submitPayPal = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
      var _yield$submitPayPalPa, redirectUrl;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setIsLoading(true);
              _context3.next = 3;
              return (0, _api.submitPayPalPayment)();
            case 3:
              _yield$submitPayPalPa = _context3.sent;
              redirectUrl = _yield$submitPayPalPa.responseData.redirectUrl;
              if (redirectUrl) {
                window.location.href = redirectUrl;
              } else {
                setIsLoading(false);
                setGeneralError(t('The payment failed. Please try again.'));
              }
            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function submitPayPal() {
      return _ref7.apply(this, arguments);
    };
  }();
  var onAdyenSubmit = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_ref8) {
      var paymentMethod, _yield$submitPayment, errors, payment, notSupportedMethod;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              paymentMethod = _ref8.data.paymentMethod;
              setGeneralError('');
              setIsLoading(true);
              _context4.next = 5;
              return (0, _api.submitPayment)(paymentMethod);
            case 5:
              _yield$submitPayment = _context4.sent;
              errors = _yield$submitPayment.errors;
              payment = _yield$submitPayment.responseData.payment;
              if (errors.length) {
                _context4.next = 12;
                break;
              }
              (0, _eventDispatcher.default)(_eventDispatcher.MSSDK_PURCHASE_SUCCESSFUL, {
                payment: payment
              });
              onPaymentComplete();
              return _context4.abrupt("return");
            case 12:
              (0, _eventDispatcher.default)(_eventDispatcher.MSSDK_PURCHASE_FAILED, {
                reason: errors[0]
              });
              notSupportedMethod = errors[0].includes('Payment details are not supported');
              setGeneralError(notSupportedMethod ? t('Payment method not supported. Try different payment method') : t('The payment failed. Please try again.'));
              setIsLoading(false);
            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return function onAdyenSubmit(_x3) {
      return _ref9.apply(this, arguments);
    };
  }();
  var paymentWithoutDetails = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
      var _yield$submitPaymentW, errors, responseData;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              setIsLoading(true);
              setGeneralError('');
              _context5.next = 4;
              return (0, _api.submitPaymentWithoutDetails)();
            case 4:
              _yield$submitPaymentW = _context5.sent;
              errors = _yield$submitPaymentW.errors;
              responseData = _yield$submitPaymentW.responseData;
              if (!errors.length) {
                _context5.next = 11;
                break;
              }
              setIsLoading(false);
              setGeneralError(t('The payment failed. Please try again.'));
              return _context5.abrupt("return");
            case 11:
              (0, _eventDispatcher.default)(_eventDispatcher.MSSDK_PURCHASE_SUCCESSFUL, {
                payment: responseData
              });
              onPaymentComplete();
            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return function paymentWithoutDetails() {
      return _ref10.apply(this, arguments);
    };
  }();
  var getDropIn = function getDropIn(drop) {
    setDropInInstance(drop);
  };
  var confirmButtonText = selectedPaymentMethod === 'paypal' ? 'Continue with PayPal' : t('Complete purchase');
  var handleConfirm = function handleConfirm() {
    if (selectedPaymentMethod === 'paypal') {
      submitPayPal();
      return;
    }
    if (!dropInInstance) {
      return;
    }
    dropInInstance.submit();
  };
  if (!isPaymentDetailsRequired) {
    return /*#__PURE__*/_react.default.createElement(_PaymentStyled.PaymentStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
      onClickFn: paymentWithoutDetails,
      theme: "confirm",
      width: "250px",
      size: "big",
      margin: "20px auto 0 auto"
    }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
      buttonLoader: true,
      color: "#ffffff"
    }) : t('Complete purchase')));
  }
  return /*#__PURE__*/_react.default.createElement(_PaymentStyled.PaymentStyled, null, generalError && /*#__PURE__*/_react.default.createElement(_PaymentStyled.PaymentErrorStyled, null, generalError), isPaymentFormDisplayed && /*#__PURE__*/_react.default.createElement(_PaymentStyled.PaymentWrapperStyled, null, isGatewayAvailable('adyen') && /*#__PURE__*/_react.default.createElement(_Adyen.default, {
    onSubmit: onAdyenSubmit,
    onChange: function onChange() {
      return setGeneralError('');
    },
    isPaymentProcessing: isLoading,
    selectPaymentMethod: selectPaymentMethod,
    selectedPaymentMethod: selectedPaymentMethod,
    isPayPalAvailable: isGatewayAvailable('paypal'),
    getDropIn: getDropIn
  }), isGatewayAvailable('paypal') && /*#__PURE__*/_react.default.createElement(_DropInSection.default, {
    isCardAvailable: isGatewayAvailable('adyen'),
    selectPaymentMethod: selectPaymentMethod,
    isSelected: selectedPaymentMethod === 'paypal',
    title: "PayPal",
    logo: /*#__PURE__*/_react.default.createElement(PaypalLogo, null)
  }, /*#__PURE__*/_react.default.createElement(_PayPal.default, {
    totalPrice: order.totalPrice,
    offerId: order.offerId
  })), /*#__PURE__*/_react.default.createElement(_AdyenStyled.ConfirmButtonStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, (_React$createElement = {
    size: "big"
  }, (0, _defineProperty2.default)(_React$createElement, "size", 'normal'), (0, _defineProperty2.default)(_React$createElement, "width", '60%'), (0, _defineProperty2.default)(_React$createElement, "margin", 'auto'), (0, _defineProperty2.default)(_React$createElement, "theme", "confirm"), (0, _defineProperty2.default)(_React$createElement, "onClickFn", handleConfirm), (0, _defineProperty2.default)(_React$createElement, "disabled", isLoading || !selectedPaymentMethod), _React$createElement), isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) : confirmButtonText))), (isPayPal || isPaymentFormDisplayed) && order.offerId.charAt(0) === 'S' && /*#__PURE__*/_react.default.createElement(_LegalNote.default, {
    order: order,
    period: period
  }));
};
exports.PurePayment = Payment;
Payment.propTypes = {
  onPaymentComplete: _propTypes.default.func.isRequired,
  isPaymentDetailsRequired: _propTypes.default.bool,
  updatePriceBreakdown: _propTypes.default.func,
  order: _propTypes.default.objectOf(_propTypes.default.any),
  period: _propTypes.default.string,
  availablePaymentMethods: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.number.isRequired,
    methodName: _propTypes.default.string.isRequired,
    paymentGateway: _propTypes.default.string.isRequired,
    default: _propTypes.default.bool
  })),
  t: _propTypes.default.func
};
Payment.defaultProps = {
  isPaymentDetailsRequired: true,
  updatePriceBreakdown: function updatePriceBreakdown() {},
  order: {},
  period: null,
  availablePaymentMethods: null,
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Payment));
exports.default = _default;