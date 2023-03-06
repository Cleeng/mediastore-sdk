import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import formatNumber from 'util/formatNumber';

import { subscriptionSwitch } from 'api';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import checkmarkIcon from 'assets/images/checkmarkBase';
import { ReactComponent as Close } from 'assets/images/errors/close.svg';
import eventDispatcher, {
  MSSDK_SWITCH_POPUP_ACTION_SUCCESSFUL,
  MSSDK_SWITCH_POPUP_ACTION_FAILED
} from 'util/eventDispatcher';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import SkeletonWrapper from 'components/SkeletonWrapper';
import {
  ImageWrapper,
  ArrowStyled,
  SubscriptionIconStyled,
  ImageStyled
} from './ResumeSubscriptionPopupStyled';

const ResumeSubscriptionPopup = ({
  toOffer,
  fromOffer,
  hideInnerPopup,
  updateList,
  isPopupLoading
}) => {
  const STEPS = {
    RESUME_DETAILS: 'RESUME_DETAILS',
    CONFIRMATION: 'CONFIRMATION'
  };

  const STEPS_NUMBERS = {
    RESUME_DETAILS: 1,
    CONFIRMATION: 2
  };

  const { t } = useTranslation();
  const [step, setStep] = useState(STEPS.RESUME_DETAILS);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const resumeSubscription = async () => {
    setIsLoading(true);
    try {
      const resp = await subscriptionSwitch(
        fromOffer.offerId,
        toOffer.toOfferId,
        toOffer.switchDirection
      );
      if (!resp.errors.length) {
        eventDispatcher(MSSDK_SWITCH_POPUP_ACTION_SUCCESSFUL, {
          fromOfferId: fromOffer.offerId,
          toOfferId: toOffer.toOfferId,
          switchDirection: toOffer.switchDirection,
          algorithm: toOffer.algorithm
        });
        setIsLoading(false);
        setStep(STEPS.CONFIRMATION);
      } else {
        eventDispatcher(MSSDK_SWITCH_POPUP_ACTION_FAILED, {
          reason: resp.errors[0]
        });
        setError(true);
        setIsLoading(false);
      }
    } catch {
      eventDispatcher(MSSDK_SWITCH_POPUP_ACTION_FAILED);
      setError(true);
      setIsLoading(false);
    }
  };

  const closePopupAndRefresh = () => {
    hideInnerPopup();
    updateList();
  };

  if (isPopupLoading) {
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('resume-subscription-popup.title', 'Resume plan')}
        currentStep={1}
      >
        <SkeletonWrapper
          showChildren={false}
          height={200}
          width={450}
          margin="auto"
        />
      </InnerPopupWrapper>
    );
  }

  if (isError) {
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('resume-subscription-popup.title', 'Resume plan')}
        currentStep={STEPS_NUMBERS[step]}
      >
        <>
          <ContentStyled>
            <ImageWrapper>
              <Close />
            </ImageWrapper>
            <TitleStyled step={step}>
              {t(
                'resume-subscription-popup.error-header',
                'An error occurred.'
              )}
            </TitleStyled>
            <TextStyled step={step}>
              {t(
                'resume-subscription-popup.error-text',
                'We have been unable to resume your plan as an error occurred. Sorry for the inconvenience, please try again.'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="confirm" onClickFn={closePopupAndRefresh}>
              {t(
                'resume-subscription-popup.error-back-button',
                'Back to My Account'
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      </InnerPopupWrapper>
    );
  }

  const planName = toOffer?.title;
  const price = formatNumber(toOffer?.nextPaymentPrice);
  const currency = toOffer?.nextPaymentPriceCurrencySymbol;

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('resume-subscription-popup.title', 'Resume plan')}
      currentStep={STEPS_NUMBERS[step]}
    >
      {step === STEPS.RESUME_DETAILS && (
        <>
          <ContentStyled>
            <ImageWrapper>
              <SubscriptionIconStyled isPaused showLabel="Paused" gray />
              <ArrowStyled />
              <SubscriptionIconStyled period={toOffer.period} showLabel="New" />
            </ImageWrapper>
            <TitleStyled step={step} textTransform="capitalize">
              {t(
                'resume-subscription-popup.header',
                'Resume your subscription'
              )}
            </TitleStyled>
            <TextStyled>
              <Trans i18nKey="resume-subscription-popup.info">
                You are about to resume your plan{' '}
                <strong>{{ planName }}</strong>. You will be charged{' '}
                <strong>
                  {{ currency }}
                  {{ price }}
                </strong>{' '}
                on the next billing date.
              </Trans>
            </TextStyled>
            <TextStyled step={step}>
              {t(
                'resume-subscription-popup.question',
                'Do you want to apply the change now?'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={closePopupAndRefresh}>
              {t(
                'resume-subscription-popup.back-button-text',
                'Continue Pause'
              )}
            </Button>
            <Button theme="confirm" onClickFn={resumeSubscription}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t(
                  'resume-subscription-popup.confirm-button-text',
                  'Resume subscription'
                )
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === STEPS.CONFIRMATION && (
        <>
          <ContentStyled>
            <ImageWrapper>
              <ImageStyled src={checkmarkIcon} alt="checkmark icon" />
            </ImageWrapper>
            <TitleStyled step={step}>
              {t('resume-subscription-popup.success-header', 'Thank you!')}
            </TitleStyled>
            <TextStyled step={step}>
              <Trans i18nKey="resume-subscription-popup.success-text">
                You have successfully resumed your plan{' '}
                <strong>{{ planName }}.</strong>
              </Trans>
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="confirm" onClickFn={closePopupAndRefresh}>
              {t('Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

ResumeSubscriptionPopup.propTypes = {
  toOffer: PropTypes.objectOf(PropTypes.any),
  fromOffer: PropTypes.objectOf(PropTypes.any),
  hideInnerPopup: PropTypes.func,
  updateList: PropTypes.func,
  isPopupLoading: PropTypes.bool
};

ResumeSubscriptionPopup.defaultProps = {
  toOffer: {},
  fromOffer: {},
  hideInnerPopup: () => {},
  updateList: () => {},
  isPopupLoading: false
};

export default ResumeSubscriptionPopup;
