import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import SectionHeader from 'components/SectionHeader';
import ProfileDetails from 'components/ProfileDetails';
import AddressDetails from 'components/AddressDetails';
import Password from 'components/Password';
import PropTypes from 'prop-types';
import { getCustomer, getCaptureStatus } from 'api';
import MyAccountError from 'components/MyAccountError';
import MyAccountConsents from 'components/MyAccountConsents';
import EditPassword from 'components/EditPassword/EditPassword';
import AdditionalProfileInfo from 'components/AdditionalProfileInfo';
import { WrapStyled } from './UpdateProfileStyled';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsError: [],
      isUserDetailsLoading: false,
      isCaptureLoading: false,
      isConsentLoading: false
    };
  }

  componentDidMount() {
    const { userProfile, setCurrentUser, setUserCapture, t } = this.props;
    if (!userProfile.user) {
      this.setState({
        isUserDetailsLoading: true
      });
      getCustomer()
        .then(response => {
          if (response.errors.length) {
            this.setState({
              detailsError: response.errors
            });
          } else {
            setCurrentUser(response.responseData);
          }
          this.setState({
            isUserDetailsLoading: false
          });
        })
        .catch(() => {
          this.setState({
            detailsError: [t('Something went wrong..')],
            isUserDetailsLoading: false
          });
        });
    }
    if (!userProfile.capture) {
      this.setState({
        isCaptureLoading: true
      });
      getCaptureStatus()
        .then(response => {
          if (response.errors.length) {
            this.setState({
              detailsError: response.errors
            });
          } else {
            setUserCapture(response.responseData);
          }
          this.setState({
            isCaptureLoading: false
          });
        })
        .catch(() => {
          this.setState({
            detailsError: [t('Something went wrong..')],
            isCaptureLoading: false
          });
        });
    }
  }

  getObjectByKey = (array, key) => {
    return array.find(setting => setting.key === key);
  };

  render() {
    const {
      detailsError,
      isUserDetailsLoading,
      isCaptureLoading,
      isConsentLoading
    } = this.state;
    const {
      userProfile: { user, consents, capture, consentsError },
      setConsents,
      setCurrentUser,
      updateCaptureOption,
      showInnerPopup,
      hideInnerPopup,
      innerPopup,
      t
    } = this.props;
    const address =
      capture && capture.isCaptureEnabled
        ? capture.settings.filter(setting => setting.key === 'address')[0]
        : null;
    const customSettings =
      capture && capture.isCaptureEnabled
        ? capture.settings.filter(
            setting => setting.key.startsWith('custom') && setting.enabled
          )
        : null;
    const birthDate =
      capture && capture.isCaptureEnabled
        ? this.getObjectByKey(capture.settings, 'birthDate')
        : null;
    const companyName =
      capture && capture.isCaptureEnabled
        ? this.getObjectByKey(capture.settings, 'companyName')
        : null;
    const phoneNumber =
      capture && capture.isCaptureEnabled
        ? this.getObjectByKey(capture.settings, 'phoneNumber')
        : null;
    return (
      <WrapStyled>
        {innerPopup.isOpen && innerPopup.type === 'editPassword' ? (
          <>
            <EditPassword hideInnerPopup={hideInnerPopup} />
          </>
        ) : (
          <>
            <SectionHeader marginTop="0">{t('Profile details')}</SectionHeader>
            {detailsError.length !== 0 ? (
              <MyAccountError generalError />
            ) : (
              <>
                <ProfileDetails
                  firstName={user ? user.firstName : ''}
                  lastName={user ? user.lastName : ''}
                  email={user ? user.email : ''}
                  isLoading={isUserDetailsLoading || isCaptureLoading}
                  setCurrentUser={setCurrentUser}
                  updateCaptureOption={updateCaptureOption}
                  birthDate={birthDate}
                  companyName={companyName}
                  phoneNumber={phoneNumber}
                />
                {address && address.enabled && (
                  <>
                    <SectionHeader marginTop="0">
                      {t('Address details')}
                    </SectionHeader>
                    <AddressDetails
                      data={address}
                      isLoading={isCaptureLoading}
                      updateCaptureOption={updateCaptureOption}
                    />
                  </>
                )}
                <SectionHeader>{t('Password')}</SectionHeader>
                <Password
                  showInnerPopup={() =>
                    showInnerPopup({ type: 'editPassword' })
                  }
                />
                {customSettings && customSettings.length > 0 && (
                  <>
                    <SectionHeader marginTop="0">
                      {t('Additional Options')}
                    </SectionHeader>
                    <AdditionalProfileInfo
                      data={customSettings}
                      updateCaptureOption={updateCaptureOption}
                    />
                  </>
                )}
              </>
            )}

            <SectionHeader> {t('Terms Details')}</SectionHeader>
            {consentsError.length !== 0 ? (
              <MyAccountError generalError />
            ) : (
              <MyAccountConsents
                consents={consents}
                isLoading={isConsentLoading}
                setConsents={setConsents}
              />
            )}
          </>
        )}
      </WrapStyled>
    );
  }
}

UpdateProfile.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  setConsents: PropTypes.func.isRequired,
  setUserCapture: PropTypes.func.isRequired,
  updateCaptureOption: PropTypes.func.isRequired,
  consentsError: PropTypes.string,
  userProfile: PropTypes.objectOf(PropTypes.any),
  showInnerPopup: PropTypes.func.isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  innerPopup: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func
};

UpdateProfile.defaultProps = {
  userProfile: { user: null },
  consentsError: '',
  t: k => k
};

export { UpdateProfile as PureUpdateProfile };

export default withTranslation()(labeling()(UpdateProfile));
