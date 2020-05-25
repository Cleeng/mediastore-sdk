/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import { PureUpdateProfile } from './UpdateProfile.component';
import { getCustomer } from '../../api';

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
  getCustomerConsents: jest
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
    .mockName('getCustomerConsents')
}));

const setCurrentUserMock = jest.fn();
const setConsentsMock = jest.fn();

describe('<UpdateProfile/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@renders', () => {
    it('should render initial state', done => {
      const wrapper = shallow(
        <PureUpdateProfile
          setCurrentUser={setCurrentUserMock}
          setConsents={setConsentsMock}
          userProfile={{ consentsError: [] }}
        />
      );
      expect(getCustomer).toHaveBeenCalled();
      setImmediate(() => {
        expect(wrapper.state().detailsError).toEqual([]);
        done();
      });
    });
    it('should store errors if getCustomer return errors', done => {
      const returnedErrors = ['Some error'];
      getCustomer.mockResolvedValueOnce({
        errors: returnedErrors
      });
      const wrapper = shallow(
        <PureUpdateProfile
          setCurrentUser={setCurrentUserMock}
          setConsents={setConsentsMock}
          userProfile={{ consentsError: [] }}
        />
      );
      setImmediate(() => {
        expect(wrapper.state().detailsError).toEqual(returnedErrors);
        done();
      });
    });
  });
});
