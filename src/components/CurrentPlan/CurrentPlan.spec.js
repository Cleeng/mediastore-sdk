/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount } from 'enzyme';
import SubscriptionManagement from 'components/SubscriptionManagement';
import { PureCurrentPlan } from './CurrentPlan';
import { SubscriptionStyled } from './CurrentPlanStyled';
import 'jest-styled-components';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  ),
  useTranslation: () => ({
    t: key => key
  })
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
    period: 'month',
    offerType: 'S'
  },
  {
    offerType: 'P',
    offerId: 'P770673843_UA',
    status: 'active',
    expiresAt: 1679669059,
    startedAt: 1648133059,
    offerTitle: 'Test pass',
    totalPrice: 25
  }
];
const showInnerPopupMock = jest.fn();
const setOfferToSwitchMock = jest.fn();
const updateList = jest.fn();

describe('<CurrentPlan/>', () => {
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
      expect(wrapper.find(SubscriptionManagement)).toHaveLength(1);
    });
  });
  describe('@actions', () => {
    it('should save data about offer to switch on click OfferCard if offerType is S', () => {
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
    it('should not save data about offer to switch on click OfferCard if offerType is P', () => {
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
        .last()
        .simulate('click');

      expect(setOfferToSwitchMock).not.toHaveBeenCalled();
    });
  });
});
