import { connect } from 'react-redux';
import { setCurrentUser } from 'redux/userProfile';

import UpdateProfile from './UpdateProfile.component';

export const mapStateToProps = state => {
  return {
    userProfile: state.userProfile
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: currentUser => {
      dispatch(setCurrentUser(currentUser));
    }
  };
};

export const MyAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);

export default MyAccountContainer;
