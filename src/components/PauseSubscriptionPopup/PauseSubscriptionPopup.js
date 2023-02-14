import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import labeling from 'containers/labeling';
import formatNumber from 'util/formatNumber';

import { subscriptionSwitch } from 'api';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import checkmarkIcon from 'assets/images/checkmarkBase';
import { ReactComponent as Close } from 'assets/images/errors/close.svg';
import { periodMapper, dateFormat, currencyFormat } from 'util/planHelper';

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

const PauseSubscriptionPopup = ({
  toOffer,
  fromOffer,
  hideInnerPopup,
  showInnerPopup,
  updateList,
  isPopupLoading,
  isPartOfCancellationFlow,
  t
}) => {
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

  const pauseSubscription = async () => {
    setIsLoading(true);
    try {
      const resp = await subscriptionSwitch(
        fromOffer.offerId,
        toOffer.toOfferId,
        toOffer.switchDirection
      );
      if (!resp.errors.length) {
        window.dispatchEvent(
          new CustomEvent('MSSDK:switch-popup-action-successful', {
            detail: {
              fromOfferId: fromOffer.offerId,
              toOfferId: toOffer.toOfferId,
              switchDirection: toOffer.switchDirection,
              algorithm: toOffer.algorithm
            }
          })
        );
        setIsLoading(false);
        setStep(STEPS.CONFIRMATION);
      } else {
        window.dispatchEvent(
          new CustomEvent('MSSDK:switch-popup-action-failed', {
            detail: { reason: resp.errors[0] }
          })
        );
        setError(true);
        setIsLoading(false);
      }
    } catch {
      window.dispatchEvent(new CustomEvent('MSSDK:switch-popup-action-failed'));
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

  return (
    <InnerPopupWrapper
      steps={isPartOfCancellationFlow ? 3 : 2}
      popupTitle={t('Pausing plan')}
      currentStep={
        isPartOfCancellationFlow ? STEPS_NUMBERS[step] + 1 : STEPS_NUMBERS[step]
      }
    >
      {step === STEPS.PAUSE_DETAILS && !isError && (
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
                Your subscription will be paused for{' '}
                {{
                  pausePeriod: periodMapper[toOffer.period].chargedForEveryText
                }}{' '}
                starting{' '}
                <strong>
                  {{ pauseStartingDate: dateFormat(fromOffer.expiresAt) }}
                </strong>
                . During the subscription pause period, you will not be charged.
                Your subscription will be automatically resumed after a{' '}
                {{
                  pausePeriod: periodMapper[toOffer.period].chargedForEveryText
                }}{' '}
                and you will continue to be charged
                <strong>
                  {' '}
                  {{
                    currencySymbol:
                      currencyFormat[fromOffer.nextPaymentCurrency]
                  }}
                  {{
                    currentPrice: formatNumber(fromOffer.nextPaymentPrice)
                  }}
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
                if (isPartOfCancellationFlow) {
                  showInnerPopup({
                    type: POPUP_TYPES.updateSubscription,
                    data: {
                      action: 'unsubscribe',
                      offerData: {
                        ...fromOffer
                      }
                    }
                  });
                } else {
                  window.dispatchEvent(
                    new CustomEvent('MSSDK:switch-popup-action-cancelled', {
                      detail: {
                        fromOfferId: fromOffer.offerId,
                        toOfferId: toOffer.toOfferId,
                        switchDirection: toOffer.switchDirection,
                        algorithm: toOffer.algorithm
                      }
                    })
                  );
                  hideInnerPopup();
                }
              }}
            >
              {t('Continue current Plan')}
            </Button>
            <Button theme="confirm" onClickFn={pauseSubscription}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t(`Pause subscription`)
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === STEPS.CONFIRMATION && !isError && (
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
      {isError && (
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
      )}
    </InnerPopupWrapper>
  );
};

PauseSubscriptionPopup.propTypes = {
  toOffer: PropTypes.objectOf(PropTypes.any),
  fromOffer: PropTypes.objectOf(PropTypes.any),
  hideInnerPopup: PropTypes.func,
  updateList: PropTypes.func,
  isPopupLoading: PropTypes.bool,
  t: PropTypes.func,
  isPartOfCancellationFlow: PropTypes.bool,
  showInnerPopup: PropTypes.func
};

PauseSubscriptionPopup.defaultProps = {
  toOffer: {},
  fromOffer: {},
  hideInnerPopup: () => {},
  showInnerPopup: () => {},
  updateList: () => {},
  isPopupLoading: false,
  t: k => k,
  isPartOfCancellationFlow: false
};

export { PauseSubscriptionPopup as PureSubscriptionPopup };

export default withTranslation()(labeling()(PauseSubscriptionPopup));
