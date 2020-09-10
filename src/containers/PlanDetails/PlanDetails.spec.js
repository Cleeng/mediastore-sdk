/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import SectionHeader from 'components/SectionHeader';
import CurrentPlan from 'components/CurrentPlan';
import getCustomerSubscriptionsRequest from 'api/Customer/getCustomerSubscriptions';
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

describe('<PlanDetails/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    it('should render initial state', () => {
      getCustomerSubscriptionsRequest.mockResolvedValue({
        responseData: {
          paymentDetails: correctData.paymentDetails
        },
        errors: []
      });
      const wrapper = shallow(
        <PurePlanDetails
          setCurrentPlan={setCurrentPlanMock}
          showSurvey={showSurveyMock}
          hideSurvey={hideSurveyMock}
          setUpdateAction={setUpdateActionMock}
          updateList={updateListMock}
        />
      );
      expect(wrapper.find(SectionHeader)).toHaveLength(1);
      expect(wrapper.find(CurrentPlan)).toHaveLength(1);
    });
    it('should call fetchSubscriptions when new props given', () => {
      const wrapper = shallow(
        <PurePlanDetails
          setCurrentPlan={setCurrentPlanMock}
          showSurvey={showSurveyMock}
          hideSurvey={hideSurveyMock}
          setUpdateAction={setUpdateActionMock}
          updateList={updateListMock}
          planDetails={{ currentPlan: [1, 2] }}
        />
      );
      wrapper.instance().fetchSubscriptions = jest.fn();
      wrapper.setProps({ planDetails: { updateList: true } });
      expect(wrapper.instance().fetchSubscriptions).toHaveBeenCalled();
    });
    it('should set state when fetchSubscriptions return error', done => {
      getCustomerSubscriptionsRequest.mockResolvedValue({
        responseData: {},
        errors: ['error']
      });
      const wrapper = shallow(
        <PurePlanDetails
          setCurrentPlan={setCurrentPlanMock}
          showSurvey={showSurveyMock}
          hideSurvey={hideSurveyMock}
          setUpdateAction={setUpdateActionMock}
          updateList={updateListMock}
        />
      );
      expect(wrapper.state('errors')).toEqual([]);
      setImmediate(() => {
        expect(wrapper.state('errors')).toEqual(['error']);
        expect(setCurrentPlanMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should catch error when fetchSubscriptions fail', done => {
      getCustomerSubscriptionsRequest.mockRejectedValue(new Error('error'));
      const wrapper = shallow(
        <PurePlanDetails
          setCurrentPlan={setCurrentPlanMock}
          showSurvey={showSurveyMock}
          hideSurvey={hideSurveyMock}
          setUpdateAction={setUpdateActionMock}
          updateList={updateListMock}
        />
      );
      expect(wrapper.state('errors')).toEqual([]);
      setImmediate(() => {
        expect(wrapper.state('errors')).toEqual(['error']);
        expect(wrapper.state('currentPlanLoading')).toEqual(false);
        expect(setCurrentPlanMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should hide survey on switch tabs', () => {
      shallow(
        <PurePlanDetails
          setCurrentPlan={setCurrentPlanMock}
          showSurvey={showSurveyMock}
          hideSurvey={hideSurveyMock}
          setUpdateAction={setUpdateActionMock}
          updateList={updateListMock}
          planDetails={{ isSurveyShown: true, currentPlan: ['mock'] }}
        />
      );
      expect(hideSurveyMock).toHaveBeenCalled();
      expect(updateListMock).toHaveBeenCalled();
    });
  });
});
