import { SET_CURRENT_USER } from 'redux/userProfile';
import { SHOW_LOADER, HIDE_LOADER } from 'redux/loader';
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

const loaderMock = {
  isLoading: true
};

describe('<UpdateProfile/>', () => {
  describe('@container', () => {
    it('should show previously added value', () => {
      const initialState = {
        userProfile: userProfileMock,
        loader: loaderMock
      };
      expect(mapStateToProps(initialState).userProfile).toEqual(
        userProfileMock
      );
      expect(mapStateToProps(initialState).isLoading).toEqual(
        loaderMock.isLoading
      );
    });
    it('should dispatch SET_CURRENT_USER action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).setCurrentUser();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_CURRENT_USER });
    });
    it('should dispatch SHOW_LOADER action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).showLoader();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SHOW_LOADER });
    });
    it('should dispatch HIDE_LOADER action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).hideLoader();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: HIDE_LOADER });
    });
  });
});
