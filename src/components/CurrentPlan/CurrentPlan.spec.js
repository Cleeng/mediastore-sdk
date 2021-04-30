/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount } from 'enzyme';
import { PureCurrentPlan } from './CurrentPlan';
import {
  SubscriptionStyled,
  SimpleButtonStyled,
  FullWidthButtonStyled
} from './CurrentPlanStyled';
import 'jest-styled-components';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const planDetailsMock = [
  {
    offerId: 'S937144802_UA',
    status: 'active',
    expiresAt: 1582706082,
    nextPaymentPrice: 14.4,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: 'Monthly subscription with 7 days trial',
    period: 'month'
  },
  {
    offerId: 'S249781156_UA',
    status: 'cancelled',
    expiresAt: 1597917717,
    nextPaymentPrice: 45.04,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: '6-Month without trial',
    period: '6months'
  }
];
const showInnerPopupMock = jest.fn();
const setOfferToSwitchMock = jest.fn();
const updateList = jest.fn();

describe('<PlanDetails/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    it('should render initial state without subscriptions', () => {
      const wrapper = mount(
        <PureCurrentPlan
          showInnerPopup={showInnerPopupMock}
          setOfferToSwitch={setOfferToSwitchMock}
          updateList={updateList}
        />
      );
      expect(wrapper.prop('subscriptions')).toStrictEqual([]);
    });
    it('should render initial state with subscriptions parameter', () => {
      const wrapper = mount(
        <PureCurrentPlan
          subscriptions={planDetailsMock}
          showInnerPopup={showInnerPopupMock}
          setOfferToSwitch={setOfferToSwitchMock}
          updateList={updateList}
        />
      );
      expect(wrapper.prop('subscriptions')).toStrictEqual(planDetailsMock);
      expect(wrapper.find(SubscriptionStyled)).toHaveLength(2);
    });
  });
  describe('@actions', () => {
    it('should call showInnerPopup on click unsubscribe', () => {
      const trueValue = true;
      const wrapper = mount(
        <PureCurrentPlan
          subscriptions={planDetailsMock}
          showInnerPopup={showInnerPopupMock}
          setOfferToSwitch={setOfferToSwitchMock}
          updateList={updateList}
          isManagementBarOpen={trueValue}
        />
      );

      wrapper.find(SimpleButtonStyled).simulate('click');

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
    it('should call showInnerPopup on click resubscribe', () => {
      const trueValue = true;
      const wrapper = mount(
        <PureCurrentPlan
          subscriptions={planDetailsMock.slice(1)}
          showInnerPopup={showInnerPopupMock}
          setOfferToSwitch={setOfferToSwitchMock}
          updateList={updateList}
          isManagementBarOpen={trueValue}
        />
      );
      wrapper.find(FullWidthButtonStyled).simulate('click');

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
    it('should save data about offer to switch on click SubscriptionCard', () => {
      const wrapper = mount(
        <PureCurrentPlan
          subscriptions={planDetailsMock}
          showInnerPopup={showInnerPopupMock}
          setOfferToSwitch={setOfferToSwitchMock}
          updateList={updateList}
        />
      );
      wrapper
        .find(SubscriptionStyled)
        .first()
        .simulate('click');

      expect(setOfferToSwitchMock).toHaveBeenCalledTimes(1);
      expect(setOfferToSwitchMock).toHaveBeenCalledWith(planDetailsMock[0]);
    });
  });
});
