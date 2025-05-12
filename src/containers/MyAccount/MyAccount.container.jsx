import { connect } from 'react-redux';
import {
  setCurrentUser,
  setConsents,
  setConsentsError
} from 'appRedux/userProfile';
import {
  showMyAccountConsentsPopup,
  hideMyAccountConsentsPopup
} from 'appRedux/myAccountConsentsPopup';
import { init as initPublisherConfig } from 'appRedux/publisherConfigSlice';
import { setActiveTab } from 'appRedux/myaccountSlice';
import MyAccount from './MyAccount.component';

export const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
    consents: state.consents,
    myAccountConsentsPopup: state.myAccountConsentsPopup,
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
    showMyAccountConsentsPopup: (type, consents) => {
      dispatch(showMyAccountConsentsPopup(type, consents));
    },
    hideMyAccountConsentsPopup: () => {
      dispatch(hideMyAccountConsentsPopup());
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
