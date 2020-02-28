import { connect } from 'react-redux';
import { setCurrentUser } from 'redux/userProfile';
import { setCurrentPlan } from 'redux/planDetails';

import MyAccount from './MyAccount.component';

export const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    planDetails: state.planDetails,
    isLoading: state.loader.isLoading
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: currentUser => {
      dispatch(setCurrentUser(currentUser));
    },
    setCurrentPlan: currentPlan => {
      dispatch(setCurrentPlan(currentPlan));
    }
  };
};

export const MyAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount);

export default MyAccountContainer;
