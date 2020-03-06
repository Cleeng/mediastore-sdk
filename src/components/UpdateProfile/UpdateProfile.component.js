/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import ProfileDetails from 'components/ProfileDetails';
import Password from 'components/Password';
import PropTypes from 'prop-types';
import { getCustomer } from 'api';
import { WrapStyled } from './UpdateProfileStyled';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null
    };
  }

  componentDidMount() {
    const { userProfile, setCurrentUser, showLoader, hideLoader } = this.props;
    if (!userProfile.user) {
      showLoader();
      getCustomer().then(response => {
        if (response.errors.length) {
          this.setState({
            errors: response.errors
          });
        } else {
          setCurrentUser(response.responseData);
          hideLoader();
        }
      });
    } else {
      hideLoader();
    }
  }

  render() {
    const {
      userProfile: { user },
      isLoading
    } = this.props;

    return (
      <WrapStyled>
        {!isLoading && user && (
          <>
            <MyAccountHeading text="Profile Details" />
            <ProfileDetails
              firstName={user.firstName}
              lastName={user.lastName}
              mail={user.email}
            />
            <MyAccountHeading text="Password" />
            <Password />
          </>
        )}
      </WrapStyled>
    );
  }
}

export default UpdateProfile;

UpdateProfile.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userProfile: PropTypes.objectOf(PropTypes.any)
};

UpdateProfile.defaultProps = {
  userProfile: { user: null }
};
