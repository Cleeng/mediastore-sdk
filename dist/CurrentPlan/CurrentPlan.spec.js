"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _CurrentPlan = require("./CurrentPlan");

var _CurrentPlanStyled = require("./CurrentPlanStyled");

require("jest-styled-components");

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
var planDetailsMock = [{
  offerId: 'S937144802_UA',
  status: 'active',
  expiresAt: 1582706082,
  nextPaymentPrice: 14.4,
  nextPaymentCurrency: 'EUR',
  paymentGateway: 'adyen',
  paymentMethod: 'mc',
  offerTitle: 'Monthly subscription with 7 days trial',
  period: 'month'
}, {
  offerId: 'S249781156_UA',
  status: 'cancelled',
  expiresAt: 1597917717,
  nextPaymentPrice: 45.04,
  nextPaymentCurrency: 'EUR',
  paymentGateway: 'adyen',
  paymentMethod: 'mc',
  offerTitle: '6-Month without trial',
  period: '6months'
}];
var showInnerPopupMock = jest.fn();
var setOfferToSwitchMock = jest.fn();
var updateList = jest.fn();
describe('<PlanDetails/>', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state without subscriptions', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
        showInnerPopup: showInnerPopupMock,
        setOfferToSwitch: setOfferToSwitchMock,
        updateList: updateList
      }));
      expect(wrapper.prop('subscriptions')).toStrictEqual([]);
    });
    it('should render initial state with subscriptions parameter', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
        subscriptions: planDetailsMock,
        showInnerPopup: showInnerPopupMock,
        setOfferToSwitch: setOfferToSwitchMock,
        updateList: updateList
      }));
      expect(wrapper.prop('subscriptions')).toStrictEqual(planDetailsMock);
      expect(wrapper.find(_CurrentPlanStyled.SubscriptionStyled)).toHaveLength(2);
    });
  });
  describe('@actions', function () {
    it('should call showInnerPopup on click unsubscribe', function () {
      var trueValue = true;
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
        subscriptions: planDetailsMock,
        showInnerPopup: showInnerPopupMock,
        setOfferToSwitch: setOfferToSwitchMock,
        updateList: updateList,
        isManagementBarOpen: trueValue
      }));
      wrapper.find(_CurrentPlanStyled.SimpleButtonStyled).simulate('click');
      expect(showInnerPopupMock).toHaveBeenCalledTimes(1);
      expect(showInnerPopupMock).toHaveBeenCalledWith({
        type: 'updateSubscription',
        data: {
          action: 'unsubscribe',
          offerData: {
            offerId: 'S937144802_UA',
            expiresAt: 1582706082
          }
        }
      });
    });
    it('should call showInnerPopup on click resubscribe', function () {
      var trueValue = true;
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
        subscriptions: planDetailsMock.slice(1),
        showInnerPopup: showInnerPopupMock,
        setOfferToSwitch: setOfferToSwitchMock,
        updateList: updateList,
        isManagementBarOpen: trueValue
      }));
      wrapper.find(_CurrentPlanStyled.FullWidthButtonStyled).simulate('click');
      expect(showInnerPopupMock).toHaveBeenCalledTimes(1);
      expect(showInnerPopupMock).toHaveBeenCalledWith({
        type: 'updateSubscription',
        data: {
          action: 'resubscribe',
          offerData: {
            offerId: 'S249781156_UA',
            expiresAt: 1597917717,
            price: '45.04€'
          }
        }
      });
    });
    it('should save data about offer to switch on click SubscriptionCard', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_CurrentPlan.PureCurrentPlan, {
        subscriptions: planDetailsMock,
        showInnerPopup: showInnerPopupMock,
        setOfferToSwitch: setOfferToSwitchMock,
        updateList: updateList
      }));
      wrapper.find(_CurrentPlanStyled.SubscriptionStyled).first().simulate('click');
      expect(setOfferToSwitchMock).toHaveBeenCalledTimes(1);
      expect(setOfferToSwitchMock).toHaveBeenCalledWith(planDetailsMock[0]);
    });
  });
});