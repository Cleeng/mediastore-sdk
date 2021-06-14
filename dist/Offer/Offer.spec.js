"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Input = require("components/Input");

var _CheckoutPriceBox = _interopRequireDefault(require("components/CheckoutPriceBox"));

var _FreeOffer = _interopRequireDefault(require("components/FreeOffer"));

var planHelper = _interopRequireWildcard(require("util/planHelper"));

var _Offer = require("./Offer");

var _offerDetails = require("./__mocks__/offerDetails");

var _orderDetails = require("./__mocks__/orderDetails");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable react/jsx-props-no-spreading */
jest.mock('containers/labeling', function () {
  return function () {
    return function (Component) {
      return function (props) {
        return /*#__PURE__*/_react.default.createElement(Component, Object.assign({
          t: function t(k) {
            return k;
          }
        }, props));
      };
    };
  };
});
jest.mock('react-i18next', function () {
  return {
    withTranslation: function withTranslation() {
      return function (Component) {
        return function (props) {
          return /*#__PURE__*/_react.default.createElement(Component, Object.assign({
            t: function t(k) {
              return k;
            }
          }, props));
        };
      };
    }
  };
});
planHelper.dateFormat = jest.fn().mockReturnValue('11/6/2020 02:31 PM GMT+1');
var mockCouponProps = {
  showMessage: false,
  message: '',
  messageType: _Input.MESSAGE_TYPE_SUCCESS,
  onSubmit: jest.fn().mockResolvedValue({})
};
describe('Offer', function () {
  describe('@render', function () {
    it('displays basic details', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Offer.PureOffer, {
        offerDetails: _offerDetails.offerDetailsMock,
        orderDetails: _orderDetails.orderDetailsMock,
        couponProps: mockCouponProps,
        onPaymentComplete: jest.fn(),
        updatePriceBreakdown: jest.fn()
      }));
      expect(wrapper.find(_CheckoutPriceBox.default)).toHaveLength(1);
    });
    it('should render FreeOffer component if the offer is free', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Offer.PureOffer, {
        offerDetails: _offerDetails.freeOfferDetailsMock,
        orderDetails: _orderDetails.freeOrderDetailsMock,
        couponProps: mockCouponProps,
        onPaymentComplete: jest.fn(),
        updatePriceBreakdown: jest.fn()
      }));
      expect(wrapper.find(_CheckoutPriceBox.default)).toHaveLength(0);
      expect(wrapper.find(_FreeOffer.default)).toHaveLength(1);
    });
    it('should generate description for all offer types', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Offer.PureOffer, {
        offerDetails: _offerDetails.offerDetailsMock,
        orderDetails: _orderDetails.orderDetailsMock,
        couponProps: mockCouponProps,
        onPaymentComplete: jest.fn(),
        updatePriceBreakdown: jest.fn()
      }));
      var subscriptionDescription = wrapper.instance().generateDescription('S');
      var eventDescription = wrapper.instance().generateDescription('E');
      var rentalDescription = wrapper.instance().generateDescription('R');
      var passDescription = wrapper.instance().generateDescription('P');
      var vodDescription = wrapper.instance().generateDescription('A');
      expect(subscriptionDescription).toMatch("You will be charged 20$ for every month.");
      expect(eventDescription).toContain('Pay-per-view event 11/6/2020 02:31 PM GMT+1');
      expect(rentalDescription).toContain('Monthly access');
      expect(passDescription).toContain('Monthly season pass');
      expect(vodDescription).toContain('Unlimited access');
    });
    it('should generate description for subscription with trial', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Offer.PureOffer, {
        offerDetails: _offerDetails.subWithTrialDetailsMock,
        orderDetails: _orderDetails.orderDetailsMock,
        couponProps: mockCouponProps,
        onPaymentComplete: jest.fn(),
        updatePriceBreakdown: jest.fn()
      }));
      var description = wrapper.instance().generateDescription('S');
      expect(description).toMatch("You will be charged 20$ after 2 months.");
    });
    it('should generate description for season pass with specific end date', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Offer.PureOffer, {
        offerDetails: _offerDetails.seasonPassDetailsMock,
        orderDetails: _orderDetails.orderDetailsMock,
        couponProps: mockCouponProps,
        onPaymentComplete: jest.fn(),
        updatePriceBreakdown: jest.fn()
      }));
      var description = wrapper.instance().generateDescription('P');
      expect(description).toMatch("Access until 11/6/2020 02:31 PM GMT+1");
    });
  });
  describe('@events', function () {
    it('should add coupon to state on coupon applied', function () {
      var couponCode = 'abc';
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Offer.PureOffer, {
        offerDetails: _offerDetails.offerDetailsMock,
        orderDetails: _orderDetails.orderDetailsMock,
        couponProps: mockCouponProps,
        onPaymentComplete: jest.fn(),
        updatePriceBreakdown: jest.fn()
      }));
      wrapper.find('CouponInput').simulate('change', couponCode);
      expect(wrapper.state().coupon).toBe(couponCode);
    });
  });
});