import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import submitConsents from 'api/Customer/submitConsents';
import getCustomerConsents from 'api/Customer/getCustomerConsents';
import MyAccountConsents from 'components/MyAccountConsents';
import { useDispatch, useSelector } from 'react-redux';
import { setConsents } from 'appRedux/userProfile';
import { CONSENTS_POPUP_VARIANTS } from 'appRedux/types/myAccountConsentsPopup.types';
import {
  WrapperStyled,
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled,
  ButtonStyled,
  HeaderStyled,
  DotStyled,
  HeaderTitleStyled,
  DotsWrapperStyled,
  InnerWrapperStyled
} from './PopupStyled';
import popupData from './MyAccountConsentsPopup.const';
import WelcomeIcon from './images/welcome.svg';
import ConsentsIcon from './images/icon_terms.svg';

const MyAccountConsentsPopup = () => {
  const [step, setStep] = useState(1);
  const [updatedConsents, setUpdatedConsents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allowSubmitConsents, setAllowSubmitConsents] = useState(false);
  const { popupType, consents } = useSelector(
    (state) => state.myAccountConsentsPopup
  );
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const checkAccess = (items) => {
    const shouldBlockConfirmButton = items.find(
      ({ required, state }) => required && state === 'declined'
    );
    setAllowSubmitConsents(!shouldBlockConfirmButton);
  };

  useEffect(() => {
    setUpdatedConsents(consents);
    checkAccess(consents);
  }, []);

  const handleSubmitConsents = () => {
    const payload = updatedConsents.map(({ name, newestVersion, state }) => ({
      name,
      version: newestVersion,
      state
    }));
    setIsLoading(true);
    submitConsents([], [], payload).then(() => {
      getCustomerConsents().then(({ responseData }) => {
        dispatch(setConsents(responseData.consents));
      });
    });
  };

  const stepData = popupData[popupType].steps[step - 1];
  const { steps } = popupData[popupType];

  const handleActionButton = () =>
    step === steps.length
      ? handleSubmitConsents()
      : setStep((prevStep) => prevStep + 1);

  const renderIcon = () => {
    if (!stepData.icon) return null;

    if (popupData[popupType] === CONSENTS_POPUP_VARIANTS.NOT_CHECKED_TERMS) {
      return <WelcomeIcon />;
    }

    return <ConsentsIcon />;
  };

  return (
    <WrapperStyled>
      <HeaderStyled>
        <DotsWrapperStyled $currentStep={step}>
          {steps.length > 1 &&
            steps.map(({ title }) => <DotStyled key={title} />)}
        </DotsWrapperStyled>
        <HeaderTitleStyled>
          {t(stepData?.translationKeys.header, stepData.headerTitle)}
        </HeaderTitleStyled>
      </HeaderStyled>
      <ContentStyled step={consents.length ? step : 1}>
        {renderIcon()}
        <TitleStyled step={step}>
          {t(stepData?.translationKeys.title, stepData.title)}
        </TitleStyled>
        <TextStyled step={step}>
          {t(stepData?.translationKeys.text, stepData.text)}
        </TextStyled>
        {step === 2 && consents && (
          <MyAccountConsents
            consents={consents}
            showConsentsOnly
            saveConsents={(items) => {
              setUpdatedConsents(items);
              checkAccess(items);
            }}
            setConsents={setConsents}
          />
        )}
      </ContentStyled>
      <ButtonWrapperStyled>
        <InnerWrapperStyled>
          <ButtonStyled
            onClickFn={handleActionButton}
            disabled={step === 2 && !allowSubmitConsents}
            width='auto'
          >
            {(isLoading && <Loader buttonLoader color='#ffffff' />) ||
              t(stepData?.translationKeys.button, stepData.buttonText)}
          </ButtonStyled>
        </InnerWrapperStyled>
      </ButtonWrapperStyled>
      <Footer isCheckout={false} />
    </WrapperStyled>
  );
};

export default MyAccountConsentsPopup;
