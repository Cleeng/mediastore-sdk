/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SET_CURRENT_USER, SET_CONSENTS } from 'redux/userProfile';
import { SHOW_POPUP } from 'redux/popup';
import { mapStateToProps, mapDispatchToProps } from './UpdateProfile.container';

const userProfileMock = {
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

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<UpdateProfile/>', () => {
  describe('@container', () => {
    it('should show previously added value', () => {
      const initialState = {
        userProfile: userProfileMock
      };
      expect(mapStateToProps(initialState).userProfile).toEqual(
        userProfileMock
      );
    });
    it('should dispatch SET_CURRENT_USER action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).setCurrentUser();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_CURRENT_USER });
    });
    it('should dispatch SET_CONSENTS action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).setConsents();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_CONSENTS });
    });
    it('should dispatch SHOW_POPUP action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).showPopup();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SHOW_POPUP });
    });
  });
});
