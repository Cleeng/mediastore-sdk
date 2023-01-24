/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import submitConsents from 'api/Customer/submitConsents';
import getCustomerConsents from 'api/Customer/getCustomerConsents';
import MyAccountConsents from 'components/MyAccountConsents';
import { useDispatch, useSelector } from 'react-redux';
import { setConsents } from 'redux/userProfile';
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
import popupData from './Popup.const';
import { ReactComponent as WelcomeIcon } from './images/welcome.svg';
import { ReactComponent as ConsentsIcon } from './images/icon_terms.svg';

const Popup = ({ t }) => {
  const [step, setStep] = useState(1);
  const [updatedConsents, setUpdatedConsents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allowSubmitConsents, setAllowSubmitConsents] = useState(false);
  const { popupType, consents } = useSelector(state => state.popup);
  const dispatch = useDispatch();

  const checkAccess = items => {
    const notCheckedTerm = items.find(
      ({ required, state }) => required && state === 'declined'
    );
    setAllowSubmitConsents(!notCheckedTerm);
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

  const handleActionButton = () => {
    if (popupData[popupType] === 'consentsUpdateRequired' || step === 2) {
      handleSubmitConsents();
      return;
    }

    setStep(prevStep => prevStep + 1);
  };

  const stepData = popupData[popupType].steps[step - 1];
  const { steps } = popupData[popupType];

  const renderIcon = () => {
    if (!stepData.icon) return null;

    if (popupData[popupType] === 'notCheckedTerms') {
      return <WelcomeIcon />;
    }

    return <ConsentsIcon />;
  };

  return (
    <WrapperStyled>
      <HeaderStyled>
        <DotsWrapperStyled currentStep={step}>
          {steps.length > 1 &&
            steps.map(({ title }) => <DotStyled key={title} />)}
        </DotsWrapperStyled>
        <HeaderTitleStyled>{t(stepData.headerTitle)}</HeaderTitleStyled>
      </HeaderStyled>
      <ContentStyled step={consents.length ? step : 1}>
        {renderIcon()}
        <TitleStyled step={step}>{t(stepData.title)}</TitleStyled>
        <TextStyled step={step}>{t(stepData.text)}</TextStyled>
        {step === 2 && consents && (
          // TODO: Remove setConsents and consents props and use redux in MyAccountConsents
          <MyAccountConsents
            consents={consents}
            showConsentsOnly
            saveConsents={items => {
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
            width="auto"
          >
            {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
              t(stepData.buttonText)}
          </ButtonStyled>
        </InnerWrapperStyled>
      </ButtonWrapperStyled>
      <Footer isCheckout={false} />
    </WrapperStyled>
  );
};

Popup.propTypes = {
  t: PropTypes.func
};

Popup.defaultProps = {
  t: k => k
};

export default withTranslation()(labeling()(Popup));
