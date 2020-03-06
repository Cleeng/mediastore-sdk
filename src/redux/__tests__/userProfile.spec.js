import { SET_CURRENT_USER } from 'redux/userProfile';
import userProfileReducer from '../userProfile';

const currentUserMock = {
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

describe('UserProfile reducer', () => {
  it('should correctly call setCurrentPlan action', () => {
    const action = { type: SET_CURRENT_USER, payload: currentUserMock };
    const expectedState = { user: currentUserMock };

    expect(userProfileReducer(undefined, action)).toMatchObject(expectedState);
  });
});
