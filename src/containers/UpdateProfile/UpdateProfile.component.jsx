import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import SectionHeader from 'components/SectionHeader';
import ProfileDetails from 'components/ProfileDetails';
import AddressDetails from 'components/AddressDetails';
import Password from 'components/Password';
import PropTypes from 'prop-types';
import { getCustomer, getCaptureStatus, getCustomerConsents } from 'api';
import MyAccountError from 'components/MyAccountError';
import MyAccountConsents from 'components/MyAccountConsents';
import EditPassword from 'components/EditPassword';
import AdditionalProfileInfo from 'components/AdditionalProfileInfo';
import { POPUP_TYPES } from 'appRedux/innerPopupReducer';
import GracePeriodError from 'components/GracePeriodError';
import { WrapStyled, SectionStyled } from './UpdateProfileStyled';

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
    const {
      userProfile,
      setCurrentUser,
      setUserCapture,
      t,
      initPublisherConfig,
      displayGracePeriodError
    } = this.props;
    if (!userProfile.user) {
      this.setState({
        isUserDetailsLoading: true
      });
      getCustomer()
        .then((response) => {
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
            detailsError: [t('updateprofile.error', 'Something went wrong..')],
            isUserDetailsLoading: false
          });
        });
    }
    if (!userProfile.capture) {
      this.setState({
        isCaptureLoading: true
      });
      getCaptureStatus()
        .then((response) => {
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
            detailsError: [t('updateprofile.error', 'Something went wrong..')],
            isCaptureLoading: false
          });
        });
    }

    if (displayGracePeriodError !== null) {
      initPublisherConfig({ displayGracePeriodError });
    }
  }

  componentWillUnmount() {
    this.setState({
      detailsError: [],
      isUserDetailsLoading: false,
      isCaptureLoading: false,
      isConsentLoading: false
    });
  }

  getObjectByKey = (array, key) => {
    return array.find((setting) => setting.key === key);
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
      handleLogout,
      t
    } = this.props;

    if (!consents.length) {
      getCustomerConsents()
        .then((response) => {
          if (!response.errors.length) {
            setConsents(response.responseData.consents);
          }
        })
        .catch();
    }

    const address =
      capture && capture.isCaptureEnabled
        ? capture.settings.filter((setting) => setting.key === 'address')[0]
        : null;
    const customSettings =
      capture && capture.isCaptureEnabled
        ? capture.settings.filter(
            (setting) => setting.key.startsWith('custom') && setting.enabled
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
        <GracePeriodError />
        {innerPopup.isOpen && innerPopup.type === 'editPassword' ? (
          <>
            <EditPassword
              hideInnerPopup={hideInnerPopup}
              customerEmail={user.email}
              handleLogout={handleLogout}
            />
          </>
        ) : (
          <>
            <SectionHeader>
              {t('updateprofile.header.profile-details', 'Profile details')}
            </SectionHeader>
            {detailsError.length !== 0 ? (
              <MyAccountError generalError />
            ) : (
              <>
                <ProfileDetails
                  firstName={user ? user.firstName : ''}
                  lastName={user ? user.lastName : ''}
                  capture={capture || {}}
                  email={user ? user.email : ''}
                  isLoading={isUserDetailsLoading || isCaptureLoading}
                  setCurrentUser={setCurrentUser}
                  updateCaptureOption={updateCaptureOption}
                  birthDate={birthDate}
                  companyName={companyName}
                  phoneNumber={phoneNumber}
                />
                {address && address.enabled && (
                  <SectionStyled>
                    <SectionHeader>
                      {t(
                        'updateprofile.header.address-details',
                        'Address details'
                      )}
                    </SectionHeader>
                    <AddressDetails
                      data={address}
                      isLoading={isCaptureLoading}
                      updateCaptureOption={updateCaptureOption}
                    />
                  </SectionStyled>
                )}
                <SectionStyled>
                  <SectionHeader marginTop='25px'>
                    {t('updateprofile.header.password', 'Password')}
                  </SectionHeader>
                  <Password
                    showInnerPopup={() =>
                      showInnerPopup({ type: POPUP_TYPES.editPassword })
                    }
                  />
                </SectionStyled>
                {customSettings && customSettings.length > 0 && (
                  <SectionStyled>
                    <SectionHeader>
                      {t(
                        'updateprofile.header.additional-options',
                        'Additional Options'
                      )}
                    </SectionHeader>
                    <AdditionalProfileInfo
                      data={customSettings}
                      updateCaptureOption={updateCaptureOption}
                    />
                  </SectionStyled>
                )}
              </>
            )}
            <SectionStyled>
              <SectionHeader marginTop='25px'>
                {t('updateprofile.header.terms-details', 'Terms Details')}
              </SectionHeader>
              {consentsError.length !== 0 ? (
                <MyAccountError generalError />
              ) : (
                <MyAccountConsents
                  consents={consents}
                  isLoading={isConsentLoading}
                  setConsents={setConsents}
                />
              )}
            </SectionStyled>
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
  userProfile: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      country: PropTypes.string,
      regDate: PropTypes.string,
      lastLoginDate: PropTypes.string,
      lastUserIp: PropTypes.string,
      externalId: PropTypes.string,
      externalData: PropTypes.shape()
    }),
    capture: PropTypes.shape({
      isCaptureEnabled: PropTypes.bool,
      shouldCaptureBeDisplayed: PropTypes.bool,
      settings: PropTypes.array
    }),
    consents: PropTypes.array,
    consentsError: PropTypes.string
  }),
  showInnerPopup: PropTypes.func.isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  innerPopup: PropTypes.shape({
    isOpen: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.object
  }).isRequired,
  t: PropTypes.func,
  displayGracePeriodError: PropTypes.bool,
  initPublisherConfig: PropTypes.func.isRequired,
  handleLogout: PropTypes.func
};

UpdateProfile.defaultProps = {
  userProfile: { user: null },
  consentsError: '',
  t: (k) => k,
  displayGracePeriodError: null,
  handleLogout: (k) => k
};

export { UpdateProfile as PureUpdateProfile };

export default withTranslation()(UpdateProfile);
