import React from 'react';
import { mount } from 'enzyme';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import CurrentPlan from 'components/CurrentPlan';
import { PurePlanDetails } from './PlanDetails.component';
import { getCustomerSubscriptions } from '../../api';

jest.mock('api', () => ({
  getCustomerSubscriptions: jest
    .fn()
    .mockResolvedValue({
      responseData: {
        paymentDetails: {
          data: {
            success: true,
            paymentDetails: [
              {
                id: 193925086,
                customerId: 280372348,
                token: '8315816736477319',
                paymentGateway: 'adyen',
                paymentMethod: 'card',
                paymentMethodSpecificParams: {
                  variant: 'mc',
                  lastCardFourDigits: '1111',
                  holderName: 'dsadsadsa',
                  cardExpirationDate: '10/2020',
                  socialSecurityNumber: ''
                },
                paymentMethodId: null
              }
            ],
            message: 'Payment details sent successfully'
          }
        }
      },
      errors: []
    })
    .mockName('getCustomerSubscriptions')
}));

const setCurrentPlanMock = jest.fn();
const showLoaderMock = jest.fn();
const hideLoaderMock = jest.fn();

describe('<PlanDetails/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(
        <PurePlanDetails
          setCurrentPlan={setCurrentPlanMock}
          showLoader={showLoaderMock}
          hideLoader={hideLoaderMock}
          isLoading={false}
        />
      );
      expect(wrapper.find(MyAccountHeading)).toHaveLength(1);
      expect(wrapper.find(CurrentPlan)).toHaveLength(1);
    });
    it('should have no content if isLoading is true', () => {
      const wrapper = mount(
        <PurePlanDetails
          setCurrentPlan={setCurrentPlanMock}
          showLoader={showLoaderMock}
          hideLoader={hideLoaderMock}
          isLoading
        />
      );
      expect(wrapper.find(MyAccountHeading)).toHaveLength(0);
      expect(wrapper.find(CurrentPlan)).toHaveLength(0);
    });
    it('should store errors if returned cannot fetch', () => {
      const returnedErrors = ['Some error'];
      getCustomerSubscriptions.mockResolvedValueOnce({
        errors: returnedErrors
      });
      const wrapper = mount(
        <PurePlanDetails
          setCurrentPlan={setCurrentPlanMock}
          showLoader={showLoaderMock}
          hideLoader={hideLoaderMock}
          isLoading={false}
        />
      );
      setImmediate(() => {
        expect(wrapper.state('errors')).toBe(returnedErrors);
      });
    });
  });
});
