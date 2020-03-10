/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
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
      isLoading,
      t
    } = this.props;

    return (
      <WrapStyled>
        {!isLoading && user && (
          <>
            <MyAccountHeading text={t('Profile Details')} />
            <ProfileDetails
              firstName={user.firstName}
              lastName={user.lastName}
              mail={user.email}
            />
            <MyAccountHeading text={t('Password')} />
            <Password />
          </>
        )}
      </WrapStyled>
    );
  }
}

UpdateProfile.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userProfile: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func
};

UpdateProfile.defaultProps = {
  userProfile: { user: null },
  t: k => k
};

export { UpdateProfile as PureUpdateProfile };

export default withTranslation()(labeling()(UpdateProfile));
