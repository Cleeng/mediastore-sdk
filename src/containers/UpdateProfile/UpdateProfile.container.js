import { connect } from 'react-redux';
import { setCurrentUser, setConsents } from 'redux/userProfile';
import { showInnerPopup, hideInnerPopup } from 'redux/innerPopupReducer';

import UpdateProfile from './UpdateProfile.component';

export const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    userConsents: [],
    consentsError: state.consentsError,
    innerPopup: state.innerPopup
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
    showInnerPopup: payload => {
      dispatch(showInnerPopup(payload));
    },
    hideInnerPopup: () => {
      dispatch(hideInnerPopup());
    }
  };
};

export const MyAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);

export default MyAccountContainer;
