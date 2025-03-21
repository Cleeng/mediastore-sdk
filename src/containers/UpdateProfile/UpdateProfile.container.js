import { connect } from 'react-redux';
import {
  setCurrentUser,
  setConsents,
  setUserCapture,
  updateCaptureOption
} from 'appRedux/userProfile';
import { showPopup, hidePopup } from 'appRedux/popupSlice';
import { init as initPublisherConfig } from 'appRedux/publisherConfigSlice';
import UpdateProfile from 'components/UpdateProfile';

export const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
    userConsents: [],
    consentsError: state.consentsError,
    popupManager: state.popupManager
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
    showPopup: (payload) => {
      dispatch(showPopup(payload));
    },
    hidePopup: () => {
      dispatch(hidePopup());
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
