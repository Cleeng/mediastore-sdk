/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import ProfileDetails from 'components/ProfileDetails';
import Password from 'components/Password';
import PropTypes from 'prop-types';
import { getCustomer } from 'api';
import MyAccountError from 'components/MyAccountError/MyAccountError';
import { WrapStyled } from './UpdateProfileStyled';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  componentDidMount() {
    const { userProfile, setCurrentUser, showLoader, hideLoader } = this.props;
    if (!userProfile.user) {
      showLoader();
      getCustomer()
        .then(response => {
          if (response.errors.length) {
            this.setState({
              errors: response.errors
            });
          } else {
            setCurrentUser(response.responseData);
            hideLoader();
          }
        })
        .catch(err => {
          this.setState({ errors: [err] });
          hideLoader();
        });
    } else {
      hideLoader();
    }
  }

  render() {
    const { errors } = this.state;
    const {
      userProfile: { user },
      isLoading,
      t
    } = this.props;

    return (
      <WrapStyled>
        {!isLoading && (
          <>
            <MyAccountHeading text={t('Profile details')} />
            {errors.length !== 0 ? (
              <MyAccountError serverError />
            ) : (
              <>
                <ProfileDetails
                  firstName={user ? user.firstName : ''}
                  lastName={user ? user.lastName : ''}
                  email={user ? user.email : ''}
                  errors={errors}
                />
                <MyAccountHeading text={t('Password')} />
                <Password />
              </>
            )}
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
