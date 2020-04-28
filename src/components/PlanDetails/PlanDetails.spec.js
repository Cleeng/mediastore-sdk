/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount } from 'enzyme';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import CurrentPlan from 'components/CurrentPlan';
import getCustomerSubscriptionsRequest from 'api/getCustomerSubscriptions';
import { PurePlanDetails } from './PlanDetails.component';

jest.mock('../../api/getCustomerSubscriptions');
jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const correctData = {
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
};
const setCurrentPlanMock = jest.fn();
const showSurveyMock = jest.fn();
const hideSurveyMock = jest.fn();
const setUpdateActionMock = jest.fn();
const updateListMock = jest.fn();
const getCustomerSubscriptionsMock = jest.fn();

describe('<PlanDetails/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      getCustomerSubscriptionsRequest.mockImplementationOnce(
        getCustomerSubscriptionsMock.mockResolvedValue({
          responseData: {
            paymentDetails: correctData.paymentDetails
          },
          errors: []
        })
      );
      const wrapper = mount(
        <PurePlanDetails
          setCurrentPlan={setCurrentPlanMock}
          showSurvey={showSurveyMock}
          hideSurvey={hideSurveyMock}
          setUpdateAction={setUpdateActionMock}
          updateList={updateListMock}
        />
      );
      expect(wrapper.find(MyAccountHeading)).toHaveLength(1);
      expect(wrapper.find(CurrentPlan)).toHaveLength(1);
    });
  });
});
