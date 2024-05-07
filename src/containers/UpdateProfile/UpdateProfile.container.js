import { connect } from 'react-redux';
import {
  setCurrentUser,
  setConsents,
  setUserCapture,
  updateCaptureOption
} from 'redux/userProfile';
import { showInnerPopup, hideInnerPopup } from 'redux/innerPopupReducer';

import { init as initPublisherConfig } from 'redux/publisherConfigSlice';
import UpdateProfile from './UpdateProfile.component';

export const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
    userConsents: [],
    consentsError: state.consentsError,
    innerPopup: state.innerPopup
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (currentUser) => {
      dispatch(setCurrentUser(currentUser));
    },
    setUserCapture: (capture) => {
      dispatch(setUserCapture(capture));
    },
    updateCaptureOption: (payload) => {
      dispatch(updateCaptureOption(payload));
    },
    setConsents: (consents) => {
      dispatch(setConsents(consents));
    },
    showInnerPopup: (payload) => {
      dispatch(showInnerPopup(payload));
    },
    hideInnerPopup: () => {
      dispatch(hideInnerPopup());
    },
    initPublisherConfig: (payload) => {
      dispatch(initPublisherConfig(payload));
    }
  };
};

export const MyAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);

export default MyAccountContainer;
