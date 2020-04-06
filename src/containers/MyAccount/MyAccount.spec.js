/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import MyAccount from './MyAccount.component';
import { getCustomerSubscriptions, getCustomer } from '../../api';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

jest.mock('api', () => ({
  getCustomer: jest
    .fn()
    .mockResolvedValue({
      responseData: {
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
      },
      errors: []
    })
    .mockName('getCustomer'),
  getCustomerSubscriptions: jest
    .fn()
    .mockResolvedValue({
      responseData: {
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
      },
      errors: []
    })
    .mockName('getCustomerSubscriptions')
}));

const setCurrentPlanMock = jest.fn();
const setCurrentUserMock = jest.fn();

describe('<MyAccount/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(
        <MyAccount
          setCurrentPlan={setCurrentPlanMock}
          setCurrentUser={setCurrentUserMock}
        />
      );
      expect(wrapper.prop('isOverlay')).toBe(false);
    });
    it('should set overlay prop if passed', () => {
      const wrapper = shallow(
        <MyAccount
          setCurrentPlan={setCurrentPlanMock}
          setCurrentUser={setCurrentUserMock}
        />
      );
      const overlayValue = true;
      wrapper.setProps({ isOverlay: overlayValue });
      expect(wrapper.prop('isOverlay')).toBe(overlayValue);
    });
    it('should store errors if cannot fetch getCustomerSubscriptions', () => {
      const returnedErrors = ['Some error'];
      getCustomerSubscriptions.mockResolvedValueOnce({
        errors: returnedErrors
      });
      const wrapper = shallow(
        <MyAccount
          setCurrentPlan={setCurrentPlanMock}
          setCurrentUser={setCurrentUserMock}
        />
      );
      setImmediate(() => {
        expect(wrapper.state('errors')).toBe(returnedErrors);
      });
    });
    it('should store errors if cannot fetch getCustomer', () => {
      const returnedErrors = ['Some error'];
      getCustomer.mockResolvedValueOnce({
        errors: returnedErrors
      });
      const wrapper = shallow(
        <MyAccount
          setCurrentPlan={setCurrentPlanMock}
          setCurrentUser={setCurrentUserMock}
        />
      );
      setImmediate(() => {
        expect(wrapper.state('errors')).toBe(returnedErrors);
      });
    });
  });
});
