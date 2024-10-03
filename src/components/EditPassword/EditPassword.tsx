import { useState } from 'react';
import { useAppSelector } from 'appRedux/store';
import { selectPublisherConfig } from 'appRedux/publisherConfigSlice';
import { t } from 'i18next';
import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';
import resetPassword from 'api/Auth/resetPassword';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Auth from 'services/auth';
import eventDispatcher, { MSSDK_AUTH_FAILED } from 'util/eventDispatcher';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled,
  MailStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { EditPasswordProps } from './EditPassword.types';

const EditPassword = ({
  hideInnerPopup,
  customerEmail,
  handleLogout
}: EditPasswordProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { resetUrl } = useAppSelector(selectPublisherConfig);

  const renderNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const logout = () => {
    handleLogout();
    Auth.logout();
    eventDispatcher(MSSDK_AUTH_FAILED, {
      source: 'EditPassword'
    });
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const { publisherId } = jwtDecode(getData('CLEENG_AUTH_TOKEN')) as {
        publisherId: string;
      };

      const response = await resetPassword(
        customerEmail,
        String(publisherId),
        resetUrl
      );
      if (!response.errors.length) {
        renderNextStep();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('edit-password.popup-title', 'Edit Password')}
      isError={isError}
      currentStep={step}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled $step={step}>
              {t('edit-password.title.step1', 'Edit Password')}
            </TitleStyled>
            <TextStyled>
              {t(
                'edit-password.text.step1',
                "If you want to edit your password, click 'YES, Reset' to receive password reset instruction on your mail"
              )}
              <MailStyled> {customerEmail}.</MailStyled>
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button variant='simple' onClickFn={() => hideInnerPopup()}>
              {t('edit-password.button.no-thanks', 'No, thanks')}
            </Button>
            <Button variant='confirm' onClickFn={handleResetPassword}>
              {(isLoading && <Loader buttonLoader color='#ffffff' />) ||
                t('edit-password.button.yes-reset', 'Yes, reset')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && (
        <>
          <ContentStyled>
            <TitleStyled $step={step}>
              {t('edit-password.title.step2', 'Email has been sent!')}
            </TitleStyled>
            <TextStyled>
              {t(
                'edit-password.text.step2',
                'Please check your inbox and follow the instructions to reset your password.'
              )}
            </TextStyled>
            <TextStyled>
              {t(
                'edit-password.text2.step2',
                'You will be logged out for security reasons.'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button variant='confirm' onClickFn={() => logout()}>
              {(isLoading && <Loader buttonLoader color='#ffffff' />) ||
                t('edit-password.button.confirm', 'Confirm')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

export default EditPassword;
