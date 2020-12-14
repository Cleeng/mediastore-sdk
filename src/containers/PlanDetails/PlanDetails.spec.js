/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';

import getCustomerSubscriptionsRequest from 'api/Customer/getCustomerSubscriptions';
import getSwitchSettingsRequest from 'api/Customer/getAvailableSwitches';

import UpdateSubscription from 'components/UpdateSubscription';
import SwitchPlanPopup from 'components/SwitchPlanPopup';

import { PurePlanDetails } from './PlanDetails.component';

jest.mock('api/Customer/getCustomerSubscriptions');
jest.mock('api/Customer/getAvailableSwitches');

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const correctData = {
  items: [
    {
      offerId: 'S568296139_ZW',
      status: 'active',
      expiresAt: 1615897260,
      nextPaymentPrice: 22.15,
      nextPaymentCurrency: 'EUR',
      paymentGateway: 'adyen',
      paymentMethod: 'card',
      offerTitle: 'Annual subscription (recurring) to pride&amp;prejudice',
      period: 'year',
      totalPrice: 20
    }
  ]
};
const switchSettings = {
  responseData: [
    {
      toOfferId: 'S717351387_PL',
      switchDirection: 'upgrade',
      title: 'dwqdewf4432',
      price: 40,
      currency: 'USD',
      currencySymbol: '$',
      period: 'month'
    },
    {
      toOfferId: 'S732952456_MN',
      switchDirection: 'downgrade',
      title: 'Test offer for Mongolian customers',
      price: 10,
      currency: 'MNT',
      currencySymbol: 'MNT',
      period: 'annual'
    }
  ],
  errors: []
};
const setCurrentPlanMock = jest.fn();
const showInnerPopupMock = jest.fn();
const hideInnerPopupMock = jest.fn();
const setOfferToSwitchMock = jest.fn();
const setSwitchSettingsMock = jest.fn();
const updateListMock = jest.fn();

const defaultProps = {
  setCurrentPlan: setCurrentPlanMock,
  showInnerPopup: showInnerPopupMock,
  hideInnerPopup: hideInnerPopupMock,
  setOfferToSwitch: setOfferToSwitchMock,
  setSwitchSettings: setSwitchSettingsMock,
  updateList: updateListMock
};
describe('<PlanDetails/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@componentDidMount', () => {
    it('should fetch subsctiptions and switch settings on mount', done => {
      getCustomerSubscriptionsRequest.mockResolvedValue({
        responseData: {
          items: correctData.items
        },
        errors: []
      });
      getSwitchSettingsRequest.mockResolvedValue(switchSettings);
      const wrapper = shallow(<PurePlanDetails {...defaultProps} />);
      expect(wrapper.state('isLoading')).toEqual({
        currentPlan: true,
        changePlan: true
      });

      setImmediate(() => {
        expect(setOfferToSwitchMock).toHaveBeenCalledWith(correctData.items[0]);
        expect(setCurrentPlanMock).toHaveBeenCalledWith(correctData.items);
        expect(setSwitchSettingsMock).toHaveBeenCalledWith({
          offerId: 'S568296139_ZW',
          settings: switchSettings.responseData
        });

        done();
      });
    });
    it('should set error when switch settings faild', done => {
      getCustomerSubscriptionsRequest.mockResolvedValue({
        responseData: {
          items: correctData.items
        },
        errors: []
      });
      getSwitchSettingsRequest.mockResolvedValue({ errors: ['error'] });
      const wrapper = shallow(<PurePlanDetails {...defaultProps} />);
      setImmediate(() => {
        expect(setOfferToSwitchMock).toHaveBeenCalledWith(correctData.items[0]);
        expect(setCurrentPlanMock).toHaveBeenCalledWith(correctData.items);
        expect(setSwitchSettingsMock).not.toHaveBeenCalled();
        expect(wrapper.state('errors')).toEqual({ changePlan: ['error'] });
        done();
      });
    });
    it('should call fetchSubscriptions when new props given', () => {
      const wrapper = shallow(
        <PurePlanDetails
          {...defaultProps}
          planDetails={{
            currentPlan: [1, 2],
            switchSettings: { id: [{ mock: 'mock' }] },
            offerToSwitch: { offerId: 'id' },
            updateList: false
          }}
        />
      );
      wrapper.instance().fetchSubscriptions = jest.fn();
      wrapper.setProps({
        planDetails: {
          updateList: true,
          switchSettings: { id: [{ mock: 'mock' }] },
          offerToSwitch: { offerId: 'id' },
          currentPlan: [1, 2, 3]
        }
      });
      expect(wrapper.instance().fetchSubscriptions).toHaveBeenCalled();
    });
    it('should set state when fetchSubscriptions return error', done => {
      getCustomerSubscriptionsRequest.mockResolvedValue({
        responseData: {},
        errors: ['error']
      });
      const wrapper = shallow(<PurePlanDetails {...defaultProps} />);
      expect(wrapper.state('errors')).toEqual({
        currentPlan: [],
        changePlan: []
      });
      setImmediate(() => {
        expect(wrapper.state('errors')).toEqual({
          currentPlan: ['error']
        });
        expect(setCurrentPlanMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should catch error when fetchSubscriptions fail', done => {
      getCustomerSubscriptionsRequest.mockRejectedValue(new Error('error'));
      const wrapper = shallow(<PurePlanDetails {...defaultProps} />);
      expect(wrapper.state('errors')).toEqual({
        currentPlan: [],
        changePlan: []
      });
      setImmediate(() => {
        expect(wrapper.state('errors')).toEqual({
          currentPlan: ['error']
        });
        expect(wrapper.state('isLoading')).toEqual({ currentPlan: false });
        expect(setCurrentPlanMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should hide survey on switch tabs', () => {
      shallow(
        <PurePlanDetails
          {...defaultProps}
          planDetails={{ isSurveyShown: true, currentPlan: ['mock'] }}
          innerPopup={{ isOpen: true }}
        />
      );
      expect(hideInnerPopupMock).toHaveBeenCalled();
      expect(updateListMock).toHaveBeenCalled();
    });
  });
  describe('@actions', () => {
    it('should render updateSubscription popup', () => {
      const wrapper = shallow(
        <PurePlanDetails
          {...defaultProps}
          planDetails={{
            currentPlan: [1],
            switchSettings: { id: [{ mock: 'mock' }] },
            offerToSwitch: { offerId: 'id' },
            updateList: false
          }}
          innerPopup={{
            isOpen: true,
            type: 'updateSubscription',
            data: { action: 'resubscribe', offerData: { mock: 'mock' } }
          }}
        />
      );
      expect(wrapper.find(UpdateSubscription).exists()).toBe(true);
    });
    it('should render SwitchPlan popup', () => {
      const wrapper = shallow(
        <PurePlanDetails
          {...defaultProps}
          planDetails={{
            currentPlan: [1],
            switchSettings: { id: [{ mock: 'mock' }] },
            offerToSwitch: { offerId: 'id' },
            updateList: false
          }}
          innerPopup={{
            isOpen: true,
            type: 'switchPlan',
            data: { offerData: { mock: 'mock' } }
          }}
        />
      );
      expect(wrapper.find(SwitchPlanPopup).exists()).toBe(true);
    });
  });
});
