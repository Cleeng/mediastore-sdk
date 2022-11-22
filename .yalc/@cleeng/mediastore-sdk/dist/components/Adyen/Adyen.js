"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureAdyen = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _variables = require("../../styles/variables");
var _appConfigHelper = require("../../util/appConfigHelper");
var _adyenWeb = _interopRequireDefault(require("@adyen/adyen-web"));
var _createPaymentSession = _interopRequireDefault(require("../../api/Payment/createPaymentSession"));
var _AdyenStyled = require("./AdyenStyled");
require("@adyen/adyen-web/dist/adyen.css");
var _eventDispatcher = _interopRequireWildcard(require("../../util/eventDispatcher"));
var _Adyen = require("./Adyen.utils");
var _Loader = _interopRequireDefault(require("../Loader"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable react/jsx-props-no-spreading */

var Adyen = function Adyen(_ref) {
  var onSubmit = _ref.onSubmit,
    isCheckout = _ref.isCheckout,
    selectPaymentMethod = _ref.selectPaymentMethod,
    isPayPalAvailable = _ref.isPayPalAvailable,
    selectedPaymentMethod = _ref.selectedPaymentMethod,
    getDropIn = _ref.getDropIn;
  var _useState = (0, _react.useState)(true),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var containerRef = (0, _react.useRef)(null);
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    dropInInstance = _useState4[0],
    setDropInInstance = _useState4[1];
  var getAdyenEnv = function getAdyenEnv() {
    return (0, _appConfigHelper.getData)('CLEENG_ENVIRONMENT') === 'production' ? 'live' : 'test';
  };
  var onError = function onError(e) {
    var error = e.error,
      fieldType = e.fieldType;
    (0, _eventDispatcher.default)(_eventDispatcher.MSSDK_ADYEN_ERROR, {
      error: error,
      fieldType: fieldType
    });
  };
  var createDropInInstance = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id, sessionData) {
      var configuration, checkout, dropin;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              configuration = {
                environment: getAdyenEnv(),
                analytics: {
                  enabled: false // Set to false to not send analytics data to Adyen.
                },

                session: {
                  id: id,
                  sessionData: sessionData
                },
                clientKey: getAdyenEnv() === 'live' ? _Adyen.CLIENT_KEY_LIVE : _Adyen.CLIENT_KEY_TEST,
                onSubmit: onSubmit,
                // onChange, // supported ?
                onError: onError,
                // TODO: is it working?
                paymentMethodsConfiguration: {
                  card: {
                    hasHolderName: true,
                    holderNameRequired: true
                  }
                },
                showPayButton: false
              }; // const cardConfiguration = {
              //   styles: {
              //     base: {
              //       color: FontColor
              //     }
              //   }
              // };
              _context.next = 3;
              return (0, _adyenWeb.default)(configuration);
            case 3:
              checkout = _context.sent;
              if (containerRef.current) {
                dropin = checkout.create('dropin');
                dropin.mount(containerRef.current);
                setDropInInstance(dropin);
                getDropIn(dropin);
              }
              setIsLoading(false);
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function createDropInInstance(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    var createSession = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _yield$createPaymentS, _yield$createPaymentS2, id, sessionData;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _createPaymentSession.default)();
              case 2:
                _yield$createPaymentS = _context2.sent;
                _yield$createPaymentS2 = _yield$createPaymentS.responseData;
                id = _yield$createPaymentS2.id;
                sessionData = _yield$createPaymentS2.sessionData;
                // TODO: handle error when id is missing
                if (id) {
                  createDropInInstance(id, sessionData);
                }
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function createSession() {
        return _ref3.apply(this, arguments);
      };
    }();
    createSession();
    // TODO: add loading indicator
  }, []);
  (0, _react.useEffect)(function () {
    if (!selectedPaymentMethod || !dropInInstance) {
      return;
    }
    if (selectedPaymentMethod === 'paypal') {
      dropInInstance.closeActivePaymentMethod();
    }
  }, [selectedPaymentMethod]);
  return /*#__PURE__*/_react.default.createElement(_AdyenStyled.AdyenStyled, {
    isMyAccount: !isCheckout,
    isAdditionalPayment: isPayPalAvailable
  }, isLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, null), /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    onClick: function onClick() {
      return selectPaymentMethod('adyen');
    }
  }));
};
exports.PureAdyen = Adyen;
Adyen.propTypes = {
  onSubmit: _propTypes.default.func.isRequired,
  isCheckout: _propTypes.default.bool,
  selectPaymentMethod: _propTypes.default.func.isRequired,
  isPayPalAvailable: _propTypes.default.bool.isRequired,
  selectedPaymentMethod: _propTypes.default.string.isRequired,
  getDropIn: _propTypes.default.func.isRequired
};
Adyen.defaultProps = {
  isCheckout: true
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Adyen));
exports.default = _default;