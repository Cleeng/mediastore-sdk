"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Checkbox = _interopRequireDefault(require("components/Checkbox"));

var _Button = _interopRequireDefault(require("components/Button"));

var _updateSubscription = _interopRequireDefault(require("api/Customer/updateSubscription"));

var _InnerPopupWrapperStyled = require("components/InnerPopupWrapper/InnerPopupWrapperStyled");

var _UpdateSubscription = require("./UpdateSubscription");

/* eslint-disable react/jsx-props-no-spreading */
jest.mock('api/Customer/updateSubscription');
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
var hideInnerPopupMock = jest.fn();
var updateListMock = jest.fn();
var actionUnsubscribeMock = 'unsubscribe';
var actionResubscribeMock = 'resubscribe';
var offerDetailsMock = {
  offerId: '1234',
  price: '12$',
  expiresAt: 54356757
};
describe('<UpdateSubscription/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render default state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
        hideInnerPopup: hideInnerPopupMock,
        updateList: updateListMock,
        action: actionUnsubscribeMock,
        offerDetails: offerDetailsMock
      }));
      expect(wrapper.state('checkedReason')).toBe('');
      expect(wrapper.state('isError')).toBe(false);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('currentStep')).toBe(1);
      expect(wrapper.find(_InnerPopupWrapperStyled.TitleStyled).text()).toEqual('We’re sorry to see you go.');
    });
    describe('@actions', function () {
      it('should set in state checked reason', function () {
        var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
          hideInnerPopup: hideInnerPopupMock,
          updateList: updateListMock,
          action: actionUnsubscribeMock,
          offerDetails: offerDetailsMock
        }));
        expect(wrapper.state('currentStep')).toBe(1);
        expect(wrapper.state('checkedReason')).toBe('');
        var checkbox = wrapper.find(_Checkbox.default).first();
        expect(checkbox.exists()).toBe(true);
        checkbox.simulate('click');
        expect(wrapper.state('checkedReason')).toBe('Poor customer support');
      });
      it('should call unsubscribe fn on button click', function () {
        var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
          hideInnerPopup: hideInnerPopupMock,
          updateList: updateListMock,
          action: actionUnsubscribeMock,
          offerDetails: offerDetailsMock
        }));
        wrapper.instance().unsubscribe = jest.fn();
        expect(wrapper.state('currentStep')).toBe(1);
        var checkbox = wrapper.find(_Checkbox.default).first();
        checkbox.simulate('click');
        expect(wrapper.state('checkedReason')).toBe('Poor customer support');
        var unsubButton = wrapper.find(_Button.default).last();
        unsubButton.simulate('click');
        expect(wrapper.instance().unsubscribe).toHaveBeenCalled();
      });
      it('should call resubscribe fn on button click', function () {
        var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
          hideInnerPopup: hideInnerPopupMock,
          updateList: updateListMock,
          action: actionResubscribeMock,
          offerDetails: offerDetailsMock
        }));
        wrapper.instance().resubscribe = jest.fn();
        wrapper.instance().forceUpdate();
        expect(wrapper.state('currentStep')).toBe(1);
        var resubButton = wrapper.find(_Button.default).last();
        resubButton.simulate('click');
        expect(wrapper.instance().resubscribe).toHaveBeenCalled();
      });
      it('should hide survey when on button click', function () {
        var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
          hideInnerPopup: hideInnerPopupMock,
          updateList: updateListMock,
          action: actionUnsubscribeMock,
          offerDetails: offerDetailsMock
        }));
        wrapper.setState({
          currentStep: 2
        });
        wrapper.find(_Button.default).first().simulate('click');
        expect(hideInnerPopupMock).toHaveBeenCalledTimes(1);
        expect(updateListMock).toHaveBeenCalledTimes(1);
        expect(updateListMock).toHaveBeenCalledTimes(1);
      });
    });
    describe('@functions', function () {
      describe('unsubscribe', function () {
        it('should change currentStep and switch off loader if request success', function (done) {
          _updateSubscription.default.mockResolvedValue({
            responseData: {},
            errors: []
          });

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
            hideInnerPopup: hideInnerPopupMock,
            updateList: updateListMock,
            action: actionUnsubscribeMock,
            offerDetails: offerDetailsMock
          }));
          wrapper.setState({
            chekedReason: 'mock reason'
          });
          wrapper.instance().unsubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(function () {
            expect(wrapper.state('isError')).toBe(false);
            expect(wrapper.state('currentStep')).toBe(2);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request returns errors', function (done) {
          _updateSubscription.default.mockResolvedValue({
            responseData: {},
            errors: ['error']
          });

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
            hideInnerPopup: hideInnerPopupMock,
            updateList: updateListMock,
            action: actionUnsubscribeMock,
            offerDetails: offerDetailsMock
          }));
          wrapper.setState({
            chekedReason: 'mock reason'
          });
          wrapper.instance().unsubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(function () {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('currentStep')).toBe(1);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request fail', function (done) {
          _updateSubscription.default.mockRejectedValue(new Error('error'));

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
            hideInnerPopup: hideInnerPopupMock,
            updateList: updateListMock,
            action: actionUnsubscribeMock,
            offerDetails: offerDetailsMock
          }));
          wrapper.setState({
            chekedReason: 'mock reason'
          });
          wrapper.instance().unsubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(function () {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('currentStep')).toBe(1);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
      });
      describe('resubscribe', function () {
        it('should change currentStep and switch off loader if request success', function (done) {
          _updateSubscription.default.mockResolvedValue({
            responseData: {},
            errors: []
          });

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
            hideInnerPopup: hideInnerPopupMock,
            updateList: updateListMock,
            action: actionUnsubscribeMock,
            offerDetails: offerDetailsMock
          }));
          wrapper.instance().resubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(function () {
            expect(wrapper.state('isError')).toBe(false);
            expect(wrapper.state('currentStep')).toBe(2);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request returns errors', function (done) {
          _updateSubscription.default.mockResolvedValue({
            responseData: {},
            errors: ['error']
          });

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
            hideInnerPopup: hideInnerPopupMock,
            updateList: updateListMock,
            action: actionUnsubscribeMock,
            offerDetails: offerDetailsMock
          }));
          wrapper.instance().resubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(function () {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('currentStep')).toBe(1);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request fail', function (done) {
          _updateSubscription.default.mockResolvedValue(new Error('error'));

          var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_UpdateSubscription.PureUpdateSubscription, {
            hideInnerPopup: hideInnerPopupMock,
            updateList: updateListMock,
            action: actionUnsubscribeMock,
            offerDetails: offerDetailsMock
          }));
          wrapper.instance().resubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(function () {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('currentStep')).toBe(1);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
      });
    });
  });
});