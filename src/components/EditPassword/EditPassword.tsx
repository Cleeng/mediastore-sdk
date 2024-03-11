import { useState } from 'react';
import { useAppSelector } from 'redux/store';
import { selectPublisherConfig } from 'redux/publisherConfigSlice';
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
    setStep(prevStep => prevStep + 1);
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
      popupTitle={t('Edit Password')}
      isError={isError}
      currentStep={step}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled $step={step}>{t('Edit Password')}</TitleStyled>
            <TextStyled>
              {t(
                "If you want to edit your password, click 'YES, Reset' to receive password reset instruction on your mail"
              )}
              <MailStyled> {customerEmail}.</MailStyled>
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="simple" onClickFn={() => hideInnerPopup()}>
              {t('No, thanks')}
            </Button>
            <Button theme="confirm" onClickFn={handleResetPassword}>
              {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
                t('Yes, Reset')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && (
        <>
          <ContentStyled>
            <TitleStyled $step={step}>{t('Email has been sent!')}</TitleStyled>
            <TextStyled>
              {t(
                'Please check your inbox and follow the instructions to reset your password.'
              )}
            </TextStyled>
            <TextStyled>
              {t('You will be logged out for security reasons.')}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="confirm" onClickFn={() => logout()}>
              {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
                t('Confirm')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

export default EditPassword;
