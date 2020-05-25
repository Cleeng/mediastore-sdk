import { connect } from 'react-redux';
import {
  setCurrentUser,
  setConsents,
  setConsentsError
} from 'redux/userProfile';
import { setCurrentPlan } from 'redux/planDetails';
import { showPopup, hidePopup } from 'redux/popup';

import MyAccount from './MyAccount.component';

export const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    planDetails: state.planDetails,
    consents: state.consents,
    popup: state.popup
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: currentUser => {
      dispatch(setCurrentUser(currentUser));
    },
    setCurrentPlan: currentPlan => {
      dispatch(setCurrentPlan(currentPlan));
    },
    setConsents: consents => {
      dispatch(setConsents(consents));
    },
    setConsentsError: msg => {
      dispatch(setConsentsError(msg));
    },
    showPopup: (type, consents) => {
      dispatch(showPopup(type, consents));
    },
    hidePopup: () => {
      dispatch(hidePopup());
    }
  };
};

export const MyAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount);

export default MyAccountContainer;
