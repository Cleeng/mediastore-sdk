"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _roundNumber = _interopRequireDefault(require("util/roundNumber"));

var _Price = _interopRequireDefault(require("./Price"));

var _PriceStyled = require("./PriceStyled");

describe('<Price/>', function () {
  describe('@renders', function () {
    it('should show price with space after number in period', function () {
      var currency = '$';
      var price = 10;
      var period = '2months';
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Price.default, {
        currency: currency,
        price: price,
        period: period
      }));
      expect(wrapper.find(_PriceStyled.CurrencyStyled).text()).toEqual(currency);
      expect(wrapper.find(_PriceStyled.PriceStyled).text()).toEqual((0, _roundNumber.default)(price));
      expect(wrapper.find(_PriceStyled.PeriodStyled).text()).toEqual("/\xA02 months");
    });
    it('should show price with period', function () {
      var currency = '$';
      var price = 10;
      var period = 'month';
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Price.default, {
        currency: currency,
        price: price,
        period: period
      }));
      expect(wrapper.find(_PriceStyled.CurrencyStyled).text()).toEqual(currency);
      expect(wrapper.find(_PriceStyled.PriceStyled).text()).toEqual((0, _roundNumber.default)(price));
      expect(wrapper.find(_PriceStyled.PeriodStyled).text()).toEqual("/\xA0month");
    });
    it('should show price without period', function () {
      var currency = '$';
      var price = 10;
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Price.default, {
        currency: currency,
        price: price
      }));
      expect(wrapper.find(_PriceStyled.CurrencyStyled).text()).toEqual(currency);
      expect(wrapper.find(_PriceStyled.PriceStyled).text()).toEqual((0, _roundNumber.default)(price));
      expect(wrapper.find(_PriceStyled.PeriodStyled).exists()).toEqual(false);
    });
  });
});