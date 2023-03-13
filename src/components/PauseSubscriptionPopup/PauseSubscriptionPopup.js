import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, Trans } from 'react-i18next';
import labeling from 'containers/labeling';
import formatNumber from 'util/formatNumber';

import { subscriptionSwitch } from 'api';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import checkmarkIcon from 'assets/images/checkmarkBase';
import { ReactComponent as Close } from 'assets/images/errors/close.svg';
import { dateFormat, currencyFormat } from 'util/planHelper';
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

const PauseSubscriptionPopup = ({ t }) => {
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
    dispatch(hidePopup({ type: 'pauseSubscription' }));
    dispatch(updateList());
  };

  if (isPopupLoading) {
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('Pausing plan')}
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
        popupTitle={t('Pausing plan')}
        currentStep={STEPS_NUMBERS[step] + 1}
      >
        <>
          <ContentStyled>
            <ImageWrapper>
              <Close />
            </ImageWrapper>
            <TitleStyled step={step}>{t('An error occurred.')}</TitleStyled>
            <TextStyled step={step}>
              {t(
                'We have been unable to pause your plan as an error occurred. Sorry for the inconvenience, please try again.'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="confirm" onClickFn={closePopupAndRefresh}>
              {t('Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      </InnerPopupWrapper>
    );
  }

  const currencySymbol = currencyFormat[fromOffer.nextPaymentCurrency];
  const currentPrice = formatNumber(fromOffer.nextPaymentPrice);
  const pauseStartingDate = dateFormat(fromOffer.expiresAt);

  return (
    <InnerPopupWrapper
      steps={3}
      popupTitle={t('Pausing plan')}
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
              {t('Subscription pause')}
            </TitleStyled>
            <TextStyled>
              <Trans i18nKey="pausesubscriptionpopup-info">
                Your subscription will be paused starting{' '}
                <strong>{{ pauseStartingDate }}</strong>. During the
                subscription pause period, you will not be charged. Your
                subscription will be automatically resumed at the beginning of
                the next season and you will continue to be charged{' '}
                <strong>
                  {{ currencySymbol }}
                  {{ currentPrice }}
                </strong>{' '}
                on a recurring basis.
              </Trans>
            </TextStyled>
            <TextStyled>
              {t('You can resume your subscription at any time.')}
            </TextStyled>
            <TextStyled step={step}>
              {t('Do you want to apply the change now?')}
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
              {t('Back')}
            </Button>
            <Button theme="confirm" onClickFn={pauseSubscription}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t('Pause subscription')
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
            <TitleStyled step={step}>{t('Thank you!')}</TitleStyled>
            <TextStyled step={step}>
              <Trans i18nKey="pausesubscriptionpopup-confirm">
                You have successfully paused your plan{' '}
                <strong>{{ planName: fromOffer.offerTitle }}.</strong>
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

PauseSubscriptionPopup.propTypes = {
  t: PropTypes.func
};

PauseSubscriptionPopup.defaultProps = {
  t: k => k
};

export { PauseSubscriptionPopup as PureSubscriptionPopup };

export default withTranslation()(labeling()(PauseSubscriptionPopup));
