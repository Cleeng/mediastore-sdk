/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount } from 'enzyme';
import { PureCurrentPlan } from './CurrentPlan';
import {
  SubscriptionStyled,
  UnsubscribeButtonStyled,
  ResubscribeButtonStyled
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
const showSurveyMock = jest.fn();
const setUpdateActionMock = jest.fn();

describe('<PlanDetails/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    it('should render initial state without subscriptions', () => {
      const wrapper = mount(
        <PureCurrentPlan
          showSurvey={showSurveyMock}
          setUpdateAction={setUpdateActionMock}
        />
      );
      expect(wrapper.prop('subscriptions')).toStrictEqual([]);
    });
    it('should render initial state with subscriptions parameter', () => {
      const wrapper = mount(
        <PureCurrentPlan
          subscriptions={planDetailsMock}
          showSurvey={showSurveyMock}
          setUpdateAction={setUpdateActionMock}
        />
      );
      expect(wrapper.prop('subscriptions')).toStrictEqual(planDetailsMock);
      expect(wrapper.find(SubscriptionStyled)).toHaveLength(2);
    });
  });
  describe('@actions', () => {
    it('should call setUpdateAction fn and showSurvey on click unsubscribe', () => {
      const wrapper = mount(
        <PureCurrentPlan
          subscriptions={planDetailsMock}
          showSurvey={showSurveyMock}
          setUpdateAction={setUpdateActionMock}
        />
      );
      wrapper.find(UnsubscribeButtonStyled).simulate('click');

      expect(showSurveyMock).toHaveBeenCalledTimes(1);
      expect(showSurveyMock).toHaveBeenCalledWith({
        offerId: 'S937144802_UA',
        expiresAt: 1582706082
      });
      expect(setUpdateActionMock).toHaveBeenCalledTimes(1);
      expect(setUpdateActionMock).toHaveBeenCalledWith('unsubscribe');
    });
    it('should call setUpdateAction fn and showSurvey on click resubscribe', () => {
      const wrapper = mount(
        <PureCurrentPlan
          subscriptions={planDetailsMock}
          showSurvey={showSurveyMock}
          setUpdateAction={setUpdateActionMock}
        />
      );
      wrapper.find(ResubscribeButtonStyled).simulate('click');

      expect(setUpdateActionMock).toHaveBeenCalledWith('resubscribe');
      expect(showSurveyMock).toHaveBeenCalledTimes(1);
      expect(showSurveyMock).toHaveBeenCalledWith({
        offerId: 'S249781156_UA',
        expiresAt: 1597917717,
        price: '45.04€'
      });
    });
  });
});
