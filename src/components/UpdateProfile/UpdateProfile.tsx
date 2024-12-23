import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCustomer, getCaptureStatus, getCustomerConsents } from 'api';
import { POPUP_TYPES } from 'appRedux/innerPopupReducer';
import { isCustomSetting } from 'util/capture';
import SectionHeader from 'components/SectionHeader';
import ProfileDetails from 'components/ProfileDetails';
import AddressDetails from 'components/AddressDetails';
import Password from 'components/Password';
import MyAccountError from 'components/MyAccountError';
import MyAccountConsents from 'components/MyAccountConsents';
import EditPassword from 'components/EditPassword';
import AdditionalProfileInfo from 'components/AdditionalProfileInfo';
import GracePeriodError from 'components/GracePeriodError';
import { CustomCaptureSetting } from 'types/Capture.types';
import { getCaptureSettings } from './utils';

import { WrapperStyled } from './UpdateProfileStyled';
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

  const [isConsentLoading, setIsConsentLoading] = useState(false);

  const fetchConsents = async () => {
    try {
      const response = await getCustomerConsents();

      if (!response.errors.length) {
        setConsents(response.responseData.consents);
      }

      setIsConsentLoading(false);
    } catch (error) {
      setDetailsError([t('updateprofile.error', 'Something went wrong..')]);
      setIsConsentLoading(false);
    }
  };

  const fetchCustomer = async () => {
    try {
      setIsUserDetailsLoading(true);

      const response = await getCustomer();

      const { errors, responseData } = response;

      if (errors?.length) {
        setDetailsError(errors);
        setIsUserDetailsLoading(false);
        return;
      }

      setCurrentUser(responseData);
      setIsUserDetailsLoading(false);
    } catch (error) {
      setDetailsError([t('updateprofile.error', 'Something went wrong..')]);
      setIsUserDetailsLoading(false);
    }
  };

  const fetchCaptureStatus = async () => {
    try {
      setIsCaptureLoading(true);

      const response = await getCaptureStatus();

      const { errors, responseData } = response;

      if (errors?.length) {
        setDetailsError(errors);
        setIsCaptureLoading(false);
        return;
      }

      setUserCapture(responseData);
      setIsUserDetailsLoading(false);
    } catch (error) {
      setDetailsError([t('updateprofile.error', 'Something went wrong..')]);
      setIsCaptureLoading(false);
    }
  };

  useEffect(() => {
    if (displayGracePeriodError !== null) {
      initPublisherConfig({ displayGracePeriodError });
    }
  }, [displayGracePeriodError]);

  useEffect(() => {
    if (!userProfile.user) {
      fetchCustomer();
    }
  }, [userProfile.user]);

  useEffect(() => {
    if (!userProfile.consents.length) {
      fetchConsents();
    }
  }, [userProfile.consents]);

  useEffect(() => {
    if (!userProfile.capture) {
      fetchCaptureStatus();
    }
  }, [userProfile.capture]);

  const { user, capture, consents, consentsError } = userProfile;

  const customSettings = capture?.isCaptureEnabled
    ? capture.settings.reduce<CustomCaptureSetting[]>(
        (acc, setting) => (isCustomSetting(setting) ? [...acc, setting] : acc),
        []
      )
    : [];

  const { address, birthDate, companyName, phoneNumber } =
    getCaptureSettings(capture);

  return (
    <WrapperStyled>
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
                capture={capture ?? {}}
                email={user?.email ?? ''}
                isLoading={isUserDetailsLoading || isCaptureLoading}
                setCurrentUser={setCurrentUser}
                updateCaptureOption={updateCaptureOption}
                birthDate={birthDate}
                companyName={companyName}
                phoneNumber={phoneNumber}
              />
              {address?.enabled && (
                <section>
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
                </section>
              )}
              <section>
                <SectionHeader marginTop='25px'>
                  {t('updateprofile.header.password', 'Password')}
                </SectionHeader>
                <Password
                  showInnerPopup={() =>
                    showInnerPopup({ type: POPUP_TYPES.editPassword })
                  }
                />
              </section>
              {customSettings.length > 0 && (
                <section>
                  <SectionHeader>
                    {t(
                      'updateprofile.header.additional-options',
                      'Additional Options'
                    )}
                  </SectionHeader>
                  <AdditionalProfileInfo
                    data={customSettings}
                    isLoading={isCaptureLoading}
                    updateCaptureOption={updateCaptureOption}
                  />
                </section>
              )}
            </>
          )}
          <section>
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
          </section>
        </>
      )}
    </WrapperStyled>
  );
};

export default UpdateProfile;
