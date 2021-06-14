"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _roundNumber = _interopRequireDefault(require("util/roundNumber"));

var _CheckoutPriceBox = require("./CheckoutPriceBox");

var _CheckoutPriceBoxStyled = require("./CheckoutPriceBoxStyled");

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
describe('CheckoutPriceBox', function () {
  var customerServiceFee = 2;
  var paymentFee = 1;
  var offerPrice = 10;
  var customerCurrencySymbol = '$';
  var discountAmount = 2;
  var taxValue = 0.23;
  var finalPriceWithCoupon = offerPrice + taxValue - discountAmount;
  var finalPriceWithFees = offerPrice + customerServiceFee + paymentFee;
  it('displays coupon discount', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_CheckoutPriceBox.PureCheckoutPriceBox, {
      isCouponApplied: true,
      finalPrice: finalPriceWithCoupon,
      discountAmount: discountAmount,
      taxValue: taxValue,
      customerServiceFee: 0,
      paymentMethodFee: 0,
      customerCurrencySymbol: customerCurrencySymbol,
      offerPrice: offerPrice
    }));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceBoxWrapper)).toHaveLength(1);
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper)).toHaveLength(4);
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(0).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat(offerPrice, " exVAT"));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(1).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat(discountAmount));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(2).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat(taxValue));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(3).find(_CheckoutPriceBoxStyled.StyledTotalOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat(finalPriceWithCoupon));
  });
  it('displays payment and service fee', function () {
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_CheckoutPriceBox.PureCheckoutPriceBox, {
      isCouponApplied: false,
      finalPrice: offerPrice + customerServiceFee + paymentFee,
      discountAmount: 0,
      taxValue: 0,
      customerServiceFee: customerServiceFee,
      paymentMethodFee: paymentFee,
      customerCurrencySymbol: customerCurrencySymbol,
      offerPrice: offerPrice
    }));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceBoxWrapper)).toHaveLength(1);
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper)).toHaveLength(3);
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(0).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _roundNumber.default)(customerServiceFee)));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(1).find(_CheckoutPriceBoxStyled.StyledOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _roundNumber.default)(paymentFee)));
    expect(wrapper.find(_CheckoutPriceBoxStyled.StyledPriceWrapper).at(2).find(_CheckoutPriceBoxStyled.StyledTotalOfferPrice).text()).toBe("".concat(customerCurrencySymbol).concat((0, _roundNumber.default)(finalPriceWithFees)));
  });
});