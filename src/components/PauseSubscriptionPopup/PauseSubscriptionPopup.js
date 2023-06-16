import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import formatNumber from 'util/formatNumber';

import { subscriptionSwitch } from 'api';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import checkmarkIcon from 'assets/images/checkmarkBase';
import { ReactComponent as Close } from 'assets/images/errors/close.svg';
import { dateFormat } from 'util/planHelper';
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
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import {
  ImageWrapper,
  ArrowStyled,
  SubscriptionIconStyled,
  ImageStyled
} from './PauseSubscriptionPopupStyled';

const PauseSubscriptionPopup = () => {
  const STEPS = {
    PAUSE_DETAILS: 'PAUSE_DETAILS',
    CONFIRMATION: 'CONFIRMATION'
  };

  const STEPS_NUMBERS = {
    PAUSE_DETAILS: 1,
    CONFIRMATION: 2
  };

  const [step, setStep] = useState(STEPS.PAUSE_DETAILS);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const { offerToSwitch: fromOffer } = useSelector(state => state.plan);
  const {
    isLoading: isPopupLoading,
    pauseSubscription: { offerData: toOffer }
  } = useSelector(state => state.popupManager);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const pauseSubscription = async () => {
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
    dispatch(hidePopup());
    dispatch(updateList());
  };

  if (isPopupLoading) {
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('pausesubscription-popup.pausing-plan', 'Pausing plan')}
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
        steps={3}
        popupTitle={t('pausesubscription-popup.pausing-plan', 'Pausing plan')}
        currentStep={STEPS_NUMBERS[step] + 1}
      >
        <>
          <ContentStyled>
            <ImageWrapper>
              <Close />
            </ImageWrapper>
            <TitleStyled step={step}>
              {t('pausesubscription-popup.error-title', 'An error occurred.')}
            </TitleStyled>
            <TextStyled step={step}>
              {t(
                'pausesubscription-popup.error-description',
                'We have been unable to pause your plan as an error occurred. Sorry for the inconvenience, please try again.'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="confirm" onClickFn={closePopupAndRefresh}>
              {t('pausesubscription-popup.back-button', 'Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      </InnerPopupWrapper>
    );
  }

  const pauseStartingDate = dateFormat(fromOffer.expiresAt);
  const { offerTitle } = fromOffer;

  return (
    <InnerPopupWrapper
      steps={3}
      popupTitle={t('pausesubscription-popup.pausing-plan', 'Pausing plan')}
      currentStep={STEPS_NUMBERS[step] + 1}
    >
      {step === STEPS.PAUSE_DETAILS && (
        <>
          <ContentStyled>
            <ImageWrapper>
              <SubscriptionIconStyled
                period={fromOffer.period}
                showLabel="Current"
                gray
              />
              <ArrowStyled />
              <SubscriptionIconStyled isPaused showLabel="Paused" />
            </ImageWrapper>
            <TitleStyled step={step} textTransform="capitalize">
              {t('pausesubscription-popup.details.title', 'Subscription pause')}
            </TitleStyled>
            <TextStyled>
              <Trans i18nKey="pausesubscription-popup.details.info">
                On your next billing cycle (
                <strong>{{ pauseStartingDate }}</strong>) your subscription
                pause will go into effect. While your subscription is paused,
                you won’t be charged for, and you won’t have access to,{' '}
                {{ offerTitle }}. You can resume your {{ offerTitle }}{' '}
                subscription at any time.
              </Trans>
            </TextStyled>
            <TextStyled>
              {t(
                'pausesubscription-popup.details.note',
                'Or, if you don`t do anything, your subscription will automatically resume at the start of the next season. When your subscription resumes, you will be billed the current monthly subscription fee for your plan.'
              )}
            </TextStyled>
            <TextStyled step={step}>
              {t(
                'pausesubscription-popup.details.question',
                'Would you like to pause?'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button
              theme="simple"
              onClickFn={() => {
                dispatch(
                  hidePopup({
                    type: POPUP_TYPES.updateSubscription,
                    data: {
                      action: 'unsubscribe',
                      offerData: {
                        ...fromOffer
                      }
                    }
                  })
                );
              }}
            >
              {t('pausesubscription-popup.details.back', 'Back')}
            </Button>
            <Button theme="confirm" onClickFn={pauseSubscription}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t(
                  'pausesubscription-popup.confirm-button',
                  'Pause subscription'
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
                'pausesubscription-popup.confirmation.title',
                'Your pause request has been confirmed.'
              )}
            </TitleStyled>
            <TextStyled step={step}>
              <Trans i18nKey="pausesubscription-popup.confirmation.info">
                You will continue to have access to your subscription through
                your current billing cycle. The pause will go into effect on{' '}
                <strong>{{ pauseStartingDate }}</strong>
              </Trans>
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="confirm" onClickFn={closePopupAndRefresh}>
              {t('pausesubscription-popup.resign-button', 'Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

export { PauseSubscriptionPopup as PureSubscriptionPopup };

export default PauseSubscriptionPopup;
