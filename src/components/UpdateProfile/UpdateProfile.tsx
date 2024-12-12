import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCustomer, getCaptureStatus, getCustomerConsents } from 'api';
import { POPUP_TYPES } from 'appRedux/innerPopupReducer';
import SectionHeader from 'components/SectionHeader';
import ProfileDetails from 'components/ProfileDetails';
import AddressDetails from 'components/AddressDetails';
import Password from 'components/Password';
import MyAccountError from 'components/MyAccountError';
import MyAccountConsents from 'components/MyAccountConsents';
import EditPassword from 'components/EditPassword';
import AdditionalProfileInfo from 'components/AdditionalProfileInfo';
import GracePeriodError from 'components/GracePeriodError';
import { CustomSetting } from 'components/AdditionalProfileInfo/AdditionalProfileInfo.types';
import { AddressCaptureSetting } from 'components/Capture/Capture.types';
import { WrapStyled, SectionStyled } from './UpdateProfileStyled';

import { UpdateProfileProps } from './UpdateProfile.types';

const UpdateProfile = ({
  userProfile,
  setCurrentUser,
  setConsents,
  setUserCapture,
  updateCaptureOption,
  showInnerPopup,
  hideInnerPopup,
  innerPopup,
  initPublisherConfig,
  handleLogout,
  displayGracePeriodError
}: UpdateProfileProps) => {
  const { t } = useTranslation();

  const [detailsError, setDetailsError] = useState<string[]>([]);
  const [isUserDetailsLoading, setIsUserDetailsLoading] = useState(false);
  const [isCaptureLoading, setIsCaptureLoading] = useState(false);

  const [isConsentLoading, setConsentLoading] = useState(false);

  useEffect(() => {
    if (!userProfile.user) {
      setIsUserDetailsLoading(true);
      getCustomer()
        .then((response) => {
          if (response.errors.length) {
            setDetailsError(response.errors);
          } else {
            setCurrentUser(response.responseData);
          }
          setIsUserDetailsLoading(false);
        })
        .catch(() => {
          setDetailsError([t('updateprofile.error', 'Something went wrong..')]);
          setIsUserDetailsLoading(false);
        });
    }

    if (!userProfile.capture) {
      setIsCaptureLoading(true);
      getCaptureStatus()
        .then((response) => {
          if (response.errors.length) {
            setDetailsError(response.errors);
          } else {
            setUserCapture(response.responseData);
          }
          setIsCaptureLoading(false);
        })
        .catch(() => {
          setDetailsError([t('updateprofile.error', 'Something went wrong..')]);
          setIsCaptureLoading(false);
        });
    }

    if (displayGracePeriodError !== null) {
      initPublisherConfig({ displayGracePeriodError });
    }
  }, [
    userProfile,
    setCurrentUser,
    setUserCapture,
    t,
    initPublisherConfig,
    displayGracePeriodError
  ]);

  const fetchConsents = async () => {
    try {
      const response = await getCustomerConsents();

      if (!response.errors.length) {
        setConsents(response.responseData.consents);
      }

      setConsentLoading(false);
    } catch (error) {
      setDetailsError([t('updateprofile.error', 'Something went wrong..')]);
      setConsentLoading(false);
    }
  };

  useEffect(() => {
    if (!userProfile.consents.length) {
      fetchConsents();
    }
  }, [userProfile.consents, setConsents]);

  const getObjectByKey = (array: Array<{ key: string }>, key: string) => {
    return array.find((setting) => setting.key === key) || null;
  };

  const { user, capture, consents, consentsError } = userProfile;

  const address = capture?.isCaptureEnabled
    ? capture.settings.find((setting) => setting.key === 'address')
    : null;

  const customSettings = capture?.isCaptureEnabled
    ? capture.settings.filter(
        (setting) => setting.key.startsWith('custom') && setting.enabled
      )
    : [];
  const birthDate = capture?.isCaptureEnabled
    ? getObjectByKey(capture.settings, 'birthDate')
    : null;
  const companyName = capture?.isCaptureEnabled
    ? getObjectByKey(capture.settings, 'companyName')
    : null;
  const phoneNumber = capture?.isCaptureEnabled
    ? getObjectByKey(capture.settings, 'phoneNumber')
    : null;

  return (
    <WrapStyled>
      <GracePeriodError />
      {innerPopup.isOpen && innerPopup.type === 'editPassword' ? (
        <EditPassword
          hideInnerPopup={hideInnerPopup}
          customerEmail={user?.email ?? ''}
          handleLogout={handleLogout}
        />
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
                firstName={user?.firstName ?? ''}
                lastName={user?.lastName ?? ''}
                capture={capture || {}}
                email={user?.email ?? ''}
                isLoading={isUserDetailsLoading || isCaptureLoading}
                setCurrentUser={setCurrentUser}
                updateCaptureOption={updateCaptureOption}
                birthDate={birthDate}
                companyName={companyName}
                phoneNumber={phoneNumber}
              />
              {address?.enabled && (
                <SectionStyled>
                  <SectionHeader>
                    {t(
                      'updateprofile.header.address-details',
                      'Address details'
                    )}
                  </SectionHeader>
                  <AddressDetails
                    data={address as AddressCaptureSetting}
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
              {customSettings.length > 0 && (
                <SectionStyled>
                  <SectionHeader>
                    {t(
                      'updateprofile.header.additional-options',
                      'Additional Options'
                    )}
                  </SectionHeader>
                  <AdditionalProfileInfo
                    data={customSettings as CustomSetting[]}
                    isLoading={isCaptureLoading}
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
};

export default UpdateProfile;
