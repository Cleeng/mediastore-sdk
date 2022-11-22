"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _jwtDecode2 = _interopRequireDefault(require("jwt-decode"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Offer = _interopRequireDefault(require("../../components/Offer"));
var _Input = require("../../components/Input");
var _ErrorPage = _interopRequireDefault(require("../../components/ErrorPage"));
var _Header = _interopRequireDefault(require("../../components/Header"));
var _Footer = _interopRequireDefault(require("../../components/Footer"));
var _Loader = _interopRequireDefault(require("../../components/Loader"));
var _api = require("../../api");
var _offerIdHelper = _interopRequireDefault(require("../../util/offerIdHelper"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../labeling"));
var _StyledOfferContainer = require("./StyledOfferContainer");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var OfferContainer = function OfferContainer(_ref) {
  var location = _ref.urlProps.location,
    propOfferId = _ref.offerId,
    onSuccess = _ref.onSuccess,
    availablePaymentMethods = _ref.availablePaymentMethods,
    t = _ref.t;
  var _useState = (0, _react.useState)(propOfferId || (0, _appConfigHelper.getData)('CLEENG_OFFER_ID')),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    offerId = _useState2[0],
    setOfferId = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isOfferFree = _useState4[0],
    setIsOfferFree = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    offerDetails = _useState6[0],
    setOfferDetails = _useState6[1];
  var _useState7 = (0, _react.useState)({
      priceBreakdown: {
        offerPrice: 0,
        discountedPrice: 0,
        discountAmount: 0
      },
      discount: {
        applied: false
      }
    }),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    orderDetails = _useState8[0],
    setOrderDetails = _useState8[1];
  var _useState9 = (0, _react.useState)(),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    errorMsg = _useState10[0],
    setErrorMsg = _useState10[1];
  var _useState11 = (0, _react.useState)(true),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    isLoading = _useState12[0],
    setIsLoading = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
    couponDetails = _useState14[0],
    setCouponDetails = _useState14[1];
  var createOrderHandler = function createOrderHandler(longOfferId) {
    (0, _api.createOrder)(longOfferId).then(function (orderDetailsResponse) {
      var errors = orderDetailsResponse.errors;
      if (errors.length) {
        setErrorMsg(errors[0]);
        return;
      }
      var order = orderDetailsResponse.responseData.order;
      setOrderDetails(order);
      (0, _appConfigHelper.setData)('CLEENG_ORDER_ID', order.id);
    });
  };
  var reuseSavedOrder = function reuseSavedOrder(id, longOfferId) {
    (0, _api.getOrder)(id).then(function (orderResponse) {
      if (orderResponse.errors.length) {
        (0, _appConfigHelper.removeData)('CLEENG_ORDER_ID');
        createOrderHandler(longOfferId);
        return;
      }
      var order = orderResponse.responseData.order;
      var _jwtDecode = (0, _jwtDecode2.default)((0, _appConfigHelper.getData)('CLEENG_AUTH_TOKEN')),
        customerId = _jwtDecode.customerId;
      if (order.offerId === longOfferId && order.customerId === customerId) {
        setOrderDetails(order);
      } else {
        (0, _appConfigHelper.removeData)('CLEENG_ORDER_ID');
        createOrderHandler(longOfferId);
      }
    }).catch(function () {
      (0, _appConfigHelper.removeData)('CLEENG_ORDER_ID');
      createOrderHandler(longOfferId);
    });
  };
  var paymentMethodsHandler = function paymentMethodsHandler() {
    (0, _api.getPaymentMethods)().then(function (paymentMethodResponse) {
      var paymentMethods = paymentMethodResponse.responseData.paymentMethods;
      var properPaymentMethodId = paymentMethods.find(function (method) {
        return (0, _appConfigHelper.getData)('CLEENG_OFFER_TYPE') === 'S' ? method.methodName === 'manual' : method.methodName !== 'manual';
      });
      (0, _api.updateOrder)(orderDetails.id, {
        paymentMethodId: properPaymentMethodId ? properPaymentMethodId.id : 0
      });
    });
  };
  var onCouponSubmit = function onCouponSubmit(couponCode) {
    if (couponCode === '') return;
    setCouponDetails(function () {
      return {
        couponLoading: true
      };
    });
    (0, _api.updateOrder)(orderDetails.id, {
      couponCode: couponCode
    }).then(function (result) {
      if (result.errors.length) {
        setCouponDetails({
          couponLoading: false,
          showMessage: true,
          message: 'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
          messageType: _Input.MESSAGE_TYPE_FAIL
        });
        window.dispatchEvent(new CustomEvent('MSSDK:redeem-coupon-failed', {
          detail: {
            coupon: couponCode,
            source: 'checkout'
          }
        }));
      } else {
        setOrderDetails(result.responseData.order);
        setCouponDetails({
          couponLoading: false,
          showMessage: true,
          message: 'Your coupon has been applied!',
          messageType: _Input.MESSAGE_TYPE_SUCCESS
        });
        window.dispatchEvent(new CustomEvent('MSSDK:redeem-coupon-success', {
          detail: {
            coupon: couponCode,
            source: 'checkout'
          }
        }));
      }
    });
  };
  (0, _react.useEffect)(function () {
    if (location) {
      (0, _offerIdHelper.default)(location, setOfferId);
    }
    if (offerId && !offerDetails) {
      (0, _api.getOfferDetails)(offerId).then(function (offerDetailsResponse) {
        if (offerDetailsResponse.errors.length) {
          setErrorMsg(offerDetailsResponse.errors[0]);
          return;
        }
        var responseData = offerDetailsResponse.responseData;
        setOfferDetails(responseData);
        setOfferId(responseData.offerId);
        (0, _appConfigHelper.setData)('CLEENG_OFFER_ID', responseData.offerId);
        (0, _appConfigHelper.setData)('CLEENG_OFFER_TYPE', responseData.offerId.charAt(0));
        var orderId = (0, _appConfigHelper.getData)('CLEENG_ORDER_ID');
        if (orderId) {
          reuseSavedOrder(orderId, responseData.offerId);
        } else {
          createOrderHandler(responseData.offerId);
        }
      });
    }
    if (offerId === '') {
      setErrorMsg('Offer not set');
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (orderDetails && orderDetails.totalPrice === 0 && !orderDetails.discount.applied) {
      setIsOfferFree(true);
    }
    if (orderDetails.id) {
      setIsLoading(false);
    }
  }, [orderDetails]);
  (0, _react.useEffect)(function () {
    if (isOfferFree) paymentMethodsHandler();
  }, [isOfferFree]);
  (0, _react.useEffect)(function () {
    if (!isLoading || errorMsg) {
      window.dispatchEvent(new CustomEvent('MSSDK:Purchase-loaded'));
    }
  }, [isLoading, errorMsg]);
  var errorMapping = function errorMapping(err) {
    var errorTypes = {
      cannotPurchase: ['Offer is blocked for country'],
      offerNotExist: ["doesn't exist", 'does not exist', 'Invalid param offerId', 'Offer not set'],
      alreadyHaveAccess: ['Access already granted'],
      generalError: ['Request failed with status code 500'],
      inactive: ['inactive']
    };
    var types = Object.keys(errorTypes);
    return types.find(function (type) {
      return errorTypes[type].find(function (item) {
        return item.includes(err) || err.includes(item);
      });
    });
  };
  if (errorMsg) {
    return /*#__PURE__*/_react.default.createElement(_ErrorPage.default, {
      type: errorMapping(errorMsg)
    });
  }
  return isLoading ? /*#__PURE__*/_react.default.createElement(_StyledOfferContainer.StyledLoaderContainer, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_StyledOfferContainer.StyledLoaderContent, null, /*#__PURE__*/_react.default.createElement(_Loader.default, null)), /*#__PURE__*/_react.default.createElement(_Footer.default, null)) : /*#__PURE__*/_react.default.createElement(_Offer.default, {
    offerDetails: offerDetails,
    orderDetails: orderDetails,
    couponProps: _objectSpread(_objectSpread({}, couponDetails), {}, {
      onSubmit: onCouponSubmit
    }),
    onPaymentComplete: onSuccess,
    updatePriceBreakdown: function updatePriceBreakdown(updatedOrder) {
      return setOrderDetails(updatedOrder);
    },
    availablePaymentMethods: availablePaymentMethods,
    t: t
  });
};
OfferContainer.propTypes = {
  offerId: _propTypes.default.string,
  onSuccess: _propTypes.default.func,
  urlProps: _propTypes.default.shape({
    location: _propTypes.default.shape({
      search: _propTypes.default.string
    })
  }),
  t: _propTypes.default.func,
  availablePaymentMethods: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.number.isRequired,
    methodName: _propTypes.default.string.isRequired,
    paymentGateway: _propTypes.default.string.isRequired,
    default: _propTypes.default.bool
  }))
};
OfferContainer.defaultProps = {
  offerId: '',
  onSuccess: function onSuccess() {},
  urlProps: {},
  t: function t(k) {
    return k;
  },
  availablePaymentMethods: null
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(OfferContainer)); // export default OfferContainer;
exports.default = _default;