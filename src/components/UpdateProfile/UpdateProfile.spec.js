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
    .mockName('getCustomer')
}));

const setCurrentUserMock = jest.fn();
const showLoaderMock = jest.fn();
const hideLoaderMock = jest.fn();

describe('<UpdateProfile/>', () => {
  describe('@renders', () => {
    it('should render initial state', done => {
      const wrapper = shallow(
        <PureUpdateProfile
          setCurrentUser={setCurrentUserMock}
          showLoader={showLoaderMock}
          hideLoader={hideLoaderMock}
          isLoading={false}
        />
      );
      expect(getCustomer).toHaveBeenCalled();
      setImmediate(() => {
        expect(wrapper.state().errors).toEqual([]);
        done();
      });
    });
    it('should store errors if cannot fetch getCustomer', done => {
      const returnedErrors = ['Some error'];
      getCustomer.mockResolvedValueOnce({
        errors: returnedErrors
      });
      const wrapper = shallow(
        <PureUpdateProfile
          setCurrentUser={setCurrentUserMock}
          showLoader={showLoaderMock}
          hideLoader={hideLoaderMock}
          isLoading={false}
        />
      );
      setImmediate(() => {
        expect(wrapper.state().errors).toEqual(returnedErrors);
        done();
      });
    });
  });
});
