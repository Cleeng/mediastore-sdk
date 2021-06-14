"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _appConfigHelper = require("util/appConfigHelper");

var _submitPaymentWithoutDetails = _interopRequireDefault(require("api/Offer/submitPaymentWithoutDetails"));

var _Button = _interopRequireDefault(require("components/Button"));

var planHelper = _interopRequireWildcard(require("util/planHelper"));

var _FreeOffer = require("./FreeOffer");

var _FreeOfferStyled = require("./FreeOfferStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

jest.mock('util/appConfigHelper');
jest.mock('api/Offer/submitPaymentWithoutDetails');
planHelper.dateFormat = jest.fn().mockReturnValue('11/6/2020 02:31 PM GMT+1');
describe('<FreeOffer/>', function () {
  describe('@render', function () {
    it('should generate description', function () {
      _appConfigHelper.getData.mockImplementationOnce(function () {
        return 'S';
      });

      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_FreeOffer.PureFreeOffer, {
        icon: "month",
        period: "month",
        expiresAt: "1604669476",
        startTime: 1604669476,
        title: "Free offer",
        onPaymentComplete: jest.fn()
      }));
      expect(wrapper.find(_FreeOfferStyled.DescriptionStyled).text()).toEqual('Free subscription');

      _appConfigHelper.getData.mockImplementationOnce(function () {
        return 'P';
      });

      var passDesc = wrapper.instance().generateDescriptionForFreeOffer('month', null, null);
      expect(passDesc).toEqual("Monthly free pass");

      _appConfigHelper.getData.mockImplementation(function () {
        return 'E';
      });

      var eventDesc = wrapper.instance().generateDescriptionForFreeOffer(null, 1604669476, 1604669476);
      expect(eventDesc).toEqual("Free event 11/6/2020 02:31 PM GMT+1");

      _appConfigHelper.getData.mockImplementation(function () {
        return 'R';
      });

      var rentalDesc = wrapper.instance().generateDescriptionForFreeOffer('month', null, null);
      expect(rentalDesc).toEqual("Monthly free access");

      _appConfigHelper.getData.mockImplementation(function () {
        return 'A';
      });

      var vodDesc = wrapper.instance().generateDescriptionForFreeOffer(null, null, null);
      expect(vodDesc).toEqual("Unlimited access");
    });
  });
  describe('@action', function () {
    it('should give access on button click - success', function (done) {
      var onPaymentCompleteMock = jest.fn();

      _appConfigHelper.getData.mockImplementationOnce(function () {
        return 'S';
      });

      _submitPaymentWithoutDetails.default.mockResolvedValue({
        responseData: {},
        errors: []
      });

      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_FreeOffer.PureFreeOffer, {
        icon: "month",
        period: "month",
        expiresAt: "1604669476",
        startTime: 1604669476,
        title: "Free offer",
        onPaymentComplete: onPaymentCompleteMock
      }));
      var button = wrapper.find(_Button.default);
      button.simulate('click');
      setImmediate(function () {
        expect(onPaymentCompleteMock).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('should set error if request failed', function (done) {
      var onPaymentCompleteMock = jest.fn();

      _appConfigHelper.getData.mockImplementationOnce(function () {
        return 'S';
      });

      _submitPaymentWithoutDetails.default.mockResolvedValue({
        errors: ['error']
      });

      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_FreeOffer.PureFreeOffer, {
        icon: "month",
        period: "month",
        expiresAt: "1604669476",
        startTime: 1604669476,
        title: "Free offer",
        onPaymentComplete: onPaymentCompleteMock
      }));
      var button = wrapper.find(_Button.default);
      button.simulate('click');
      setImmediate(function () {
        expect(onPaymentCompleteMock).not.toHaveBeenCalled();
        expect(wrapper.state().isLoading).toBe(false);
        expect(wrapper.state().error).not.toBe('');
        done();
      });
    });
  });
});