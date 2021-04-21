/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';

import getCustomerSubscriptionsRequest from 'api/Customer/getCustomerSubscriptions';

import UpdateSubscription from 'components/UpdateSubscription';

import { PurePlanDetails } from './PlanDetails.component';

jest.mock('api/Customer/getCustomerSubscriptions');

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

const setCurrentPlanMock = jest.fn();
const showInnerPopupMock = jest.fn();
const hideInnerPopupMock = jest.fn();
const updateListMock = jest.fn();

const defaultProps = {
  setCurrentPlan: setCurrentPlanMock,
  showInnerPopup: showInnerPopupMock,
  hideInnerPopup: hideInnerPopupMock,
  updateList: updateListMock
};
describe('<PlanDetails/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@componentDidMount', () => {
    it('should fetch subsctiptions on mount', done => {
      getCustomerSubscriptionsRequest.mockResolvedValue({
        responseData: {
          items: correctData.items
        },
        errors: []
      });
      const wrapper = shallow(<PurePlanDetails {...defaultProps} />);
      expect(wrapper.state('isLoading')).toEqual({
        currentPlan: true
      });

      setImmediate(() => {
        expect(setCurrentPlanMock).toHaveBeenCalledWith(correctData.items);
        done();
      });
    });
    it('should call fetchSubscriptions when new props given', () => {
      const wrapper = shallow(
        <PurePlanDetails
          {...defaultProps}
          planDetails={{
            currentPlan: [1, 2],
            updateList: false
          }}
        />
      );
      wrapper.instance().fetchSubscriptions = jest.fn();
      wrapper.setProps({
        planDetails: {
          updateList: true,
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
        currentPlan: []
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
        currentPlan: []
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
  });
});
