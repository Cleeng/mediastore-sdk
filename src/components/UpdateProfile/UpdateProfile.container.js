import { connect } from 'react-redux';
import { setCurrentUser, setConsents } from 'redux/userProfile';
import { showPopup } from 'redux/popup';

import UpdateProfile from './UpdateProfile.component';

export const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    userConsents: [],
    consentsError: state.consentsError
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
    }
  };
};

export const MyAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);

export default MyAccountContainer;
