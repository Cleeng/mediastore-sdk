/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import getCustomerSubscriptionsRequest from 'api/getCustomerSubscriptions';
import getCustomerRequest from 'api/getCustomer';
import MyAccount from './MyAccount.component';

jest.mock('../../api/getCustomerSubscriptions');
jest.mock('../../api/getCustomer');

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));
const getCustomerSubscriptionsMock = jest.fn();
const getCustomerMock = jest.fn();
const customerData = {
  id: 338816933,
  email: 'user@example.com',
  firstName: '',
  lastName: '',
  dateOfBirth: null,
  country: 'GB',
  companyName: null,
  phoneNumber: null,
  addressLine1: null,
  addressLine2: null,
  city: null,
  state: null,
  postalCode: null,
  regDate: '2020-02-12 15:18:56',
  lastLoginDate: '2020-02-21 07:13:49',
  transactions: '6',
  payment: 'mc',
  termsAccepted: 'no',
  marketingOptIn: 'no',
  lastUserIp: '213.156.120.102',
  externalId: '',
  externalData: null
};
const subscriptionsData = {
  items: [
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
      status: 'active',
      expiresAt: 1597917717,
      nextPaymentPrice: 45.04,
      nextPaymentCurrency: 'EUR',
      paymentGateway: 'adyen',
      paymentMethod: 'mc',
      offerTitle: '6-Month without trial',
      period: '6months'
    }
  ]
};

const setCurrentPlanMock = jest.fn();
const setCurrentUserMock = jest.fn();

describe('<MyAccount/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@renders', () => {
    it('should fetch currentPlan and customer on componentDidMount', done => {
      getCustomerSubscriptionsRequest.mockImplementationOnce(
        getCustomerSubscriptionsMock.mockResolvedValue({
          responseData: subscriptionsData,
          errors: []
        })
      );
      getCustomerRequest.mockImplementationOnce(
        getCustomerMock.mockResolvedValue({
          responseData: customerData,
          errors: []
        })
      );
      shallow(
        <MyAccount
          setCurrentPlan={setCurrentPlanMock}
          setCurrentUser={setCurrentUserMock}
          planDetails={{ currentPlan: [] }}
          userProfile={{ user: null }}
        />
      );
      setImmediate(() => {
        expect(setCurrentUserMock).toHaveBeenCalled();
        expect(setCurrentUserMock).toHaveBeenCalledWith(customerData);
        done();
      });
    });
    it('should store errors if cannot fetch getCustomerSubscriptions', done => {
      const returnedErrors = ['Some error'];
      getCustomerSubscriptionsRequest.mockImplementationOnce(
        getCustomerSubscriptionsMock.mockResolvedValue({
          responseData: {},
          errors: returnedErrors
        })
      );
      const wrapper = shallow(
        <MyAccount
          setCurrentPlan={setCurrentPlanMock}
          setCurrentUser={setCurrentUserMock}
          planDetails={{ currentPlan: [] }}
          userProfile={{ user: { email: 'example@user.com' } }}
        />
      );
      setImmediate(() => {
        expect(wrapper.state().errors).toEqual(returnedErrors);
        expect(setCurrentPlanMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should store errors if cannot fetch getCustomer', done => {
      const returnedErrors = ['Some error'];
      getCustomerRequest.mockImplementationOnce(
        getCustomerMock.mockResolvedValue({
          responseData: {},
          errors: returnedErrors
        })
      );
      const wrapper = shallow(
        <MyAccount
          setCurrentPlan={setCurrentPlanMock}
          setCurrentUser={setCurrentUserMock}
          planDetails={{ currentPlan: subscriptionsData.items }}
          userProfile={{ user: null }}
        />
      );
      setImmediate(() => {
        expect(wrapper.state().errors).toEqual(returnedErrors);
        expect(setCurrentUserMock).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
