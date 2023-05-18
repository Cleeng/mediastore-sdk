import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import labeling from 'containers/labeling';

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

  const pauseStartingDate = dateFormat(fromOffer.expiresAt);
  const { offerTitle } = fromOffer;

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
                'pausesubscriptionpopup-note',
                'Or, if you don`t do anything, your subscription will automatically resume at the start of the next season. When your subscription resumes, you will be billed the current monthly subscription fee for your plan.'
              )}
            </TextStyled>
            <TextStyled step={step}>{t('Would you like to pause?')}</TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button
              theme="simple"
              onClickFn={() => {
                showInnerPopup({
                  type: POPUP_TYPES.updateSubscription,
                  data: {
                    action: 'unsubscribe',
                    offerData: {
                      ...fromOffer
                    }
                  }
                });
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
            <TitleStyled step={step}>
              {t('Your pause request has been confirmed.')}
            </TitleStyled>
            <TextStyled step={step}>
              <Trans i18nKey="pausesubscriptionpopup-confirm">
                You will continue to have access to your subscription through
                your current billing cycle. The pause will go into effect on{' '}
                <strong>{{ pauseStartingDate }}</strong>
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
  toOffer: PropTypes.objectOf(PropTypes.any),
  fromOffer: PropTypes.objectOf(PropTypes.any),
  hideInnerPopup: PropTypes.func,
  updateList: PropTypes.func,
  isPopupLoading: PropTypes.bool,
  t: PropTypes.func,
  showInnerPopup: PropTypes.func
};

PauseSubscriptionPopup.defaultProps = {
  toOffer: {},
  fromOffer: {},
  hideInnerPopup: () => {},
  showInnerPopup: () => {},
  updateList: () => {},
  isPopupLoading: false,
  t: k => k
};

export { PauseSubscriptionPopup as PureSubscriptionPopup };

export default withTranslation()(labeling()(PauseSubscriptionPopup));
