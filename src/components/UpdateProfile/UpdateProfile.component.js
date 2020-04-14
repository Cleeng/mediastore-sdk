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
      errors: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const { userProfile, setCurrentUser } = this.props;
    if (!userProfile.user) {
      this.setState({
        isLoading: true
      });
      getCustomer()
        .then(response => {
          if (response.errors.length) {
            this.setState({
              errors: response.errors
            });
          } else {
            setCurrentUser(response.responseData);
          }
          this.setState({
            isLoading: false
          });
        })
        .catch(err => {
          this.setState({ errors: [err], isLoading: false });
        });
    }
  }

  render() {
    const { errors, isLoading } = this.state;
    const {
      userProfile: { user },
      t
    } = this.props;

    return (
      <WrapStyled>
        <MyAccountHeading text={t('Profile details')} />
        {errors.length !== 0 ? (
          <MyAccountError serverError />
        ) : (
          <>
            <ProfileDetails
              firstName={user ? user.firstName : ''}
              lastName={user ? user.lastName : ''}
              email={user ? user.email : ''}
              isLoading={isLoading}
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
  userProfile: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func
};

UpdateProfile.defaultProps = {
  userProfile: { user: null },
  t: k => k
};

export { UpdateProfile as PureUpdateProfile };

export default withTranslation()(labeling()(UpdateProfile));
