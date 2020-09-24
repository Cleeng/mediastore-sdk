import { connect } from 'react-redux';
import {
  setCurrentUser,
  setConsents,
  showResetPassword,
  hideResetPassword
} from 'redux/userProfile';
import { showPopup } from 'redux/popup';

import UpdateProfile from './UpdateProfile.component';

export const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    userConsents: [],
    consentsError: state.consentsError,
    isResetPasswordShown: state.isResetPasswordShown
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: currentUser => {
      dispatch(setCurrentUser(currentUser));
    },
    setConsents: consents => {
      dispatch(setConsents(consents));
    },
    showPopup: type => {
      dispatch(showPopup(type));
    },
    showResetPassword: type => {
      dispatch(showResetPassword(type));
    },
    hideResetPassword: type => {
      dispatch(hideResetPassword(type));
    }
  };
};

export const MyAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);

export default MyAccountContainer;
