import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
import { updateList } from 'redux/planDetailsSlice';
import { hidePopup } from 'redux/popupSlice';

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

const ResumeSubscriptionPopup = () => {
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
  const { offerToSwitch: fromOffer } = useSelector(state => state.plan);
  const {
    isLoading: isPopupLoading,
    resumeSubscription: { offerData: toOffer }
  } = useSelector(state => state.popupManager);

  const dispatch = useDispatch();

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
          algorithm: toOffer.algorithm,
          subscriptionSwitchId: resp.responseData.id,
          subscriptionId: fromOffer.subscriptionId
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
    dispatch(hidePopup());
    dispatch(updateList());
  };

  if (isPopupLoading) {
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('resumesubscription-popup.title', 'Resume plan')}
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
        popupTitle={t('resumesubscription-popup.title', 'Resume plan')}
        currentStep={STEPS_NUMBERS[step]}
      >
        <>
          <ContentStyled>
            <ImageWrapper>
              <Close />
            </ImageWrapper>
            <TitleStyled step={step}>
              {t('resumesubscription-popup.error-header', 'An error occurred.')}
            </TitleStyled>
            <TextStyled step={step}>
              {t(
                'resumesubscription-popup.error-text',
                'We have been unable to resume your plan as an error occurred. Sorry for the inconvenience, please try again.'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="confirm" onClickFn={closePopupAndRefresh}>
              {t(
                'resumesubscription-popup.error-back-button',
                'Back to My Account'
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      </InnerPopupWrapper>
    );
  }

  const planName = toOffer?.title;

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('resumesubscription-popup.title', 'Resume plan')}
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
                'resumesubscription-popup.header',
                'Resume your {{ planName }} subscription',
                { planName }
              )}
            </TitleStyled>
            <TextStyled>
              {t(
                'resumesubscription-popup.info',
                ' Click the button below to resume your {{ planName }} subscription.',
                { planName }
              )}
            </TextStyled>
            <TextStyled step={step}>
              {t(
                'resumesubscription-popup.apply-change-question',
                'Do you want to apply the change now?'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={closePopupAndRefresh}>
              {t('resumesubscription-popup.back-button-text', 'Continue Pause')}
            </Button>
            <Button theme="confirm" onClickFn={resumeSubscription}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t(
                  'resumesubscription-popup.confirm-button-text',
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
              {t(
                'resumesubscription-popup.success-header',
                'Your {{ planName }} subscription has been resumed',
                { planName }
              )}
            </TitleStyled>
            <TextStyled step={step}>
              {t(
                'resumesubscription-popup.success-text',
                'You can now access your {{ planName }} subscription.',
                { planName }
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="confirm" onClickFn={closePopupAndRefresh}>
              {t('resumesubscription-popup.back-button', 'Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

export default ResumeSubscriptionPopup;
