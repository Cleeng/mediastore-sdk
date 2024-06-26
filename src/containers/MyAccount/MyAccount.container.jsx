import { connect } from 'react-redux';
import {
  setCurrentUser,
  setConsents,
  setConsentsError
} from 'appRedux/userProfile';
import { showPopup, hidePopup } from 'appRedux/popup';
import { init as initPublisherConfig } from 'appRedux/publisherConfigSlice';
import { setActiveTab } from 'appRedux/myaccountSlice';
import MyAccount from './MyAccount.component';

export const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
    consents: state.consents,
    popup: state.popup,
    myaccountState: state.myaccount
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (currentUser) => {
      dispatch(setCurrentUser(currentUser));
    },
    setConsents: (consents) => {
      dispatch(setConsents(consents));
    },
    setConsentsError: (msg) => {
      dispatch(setConsentsError(msg));
    },
    showPopup: (type, consents) => {
      dispatch(showPopup(type, consents));
    },
    hidePopup: () => {
      dispatch(hidePopup());
    },
    initPublisherConfig: (payload) => {
      dispatch(initPublisherConfig(payload));
    },
    setActiveTab: (payload) => {
      dispatch(setActiveTab(payload));
    }
  };
};

export const MyAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount);

export default MyAccountContainer;
