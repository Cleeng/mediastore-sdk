import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import { subscriptionSwitch } from 'api';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import { dateFormat } from 'util/planHelper';
import checkmarkIcon from 'assets/images/checkmarkBase';
import { ReactComponent as Close } from 'assets/images/errors/close.svg';

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
} from './SwitchPlanPopupStyled';

const SwitchPlanPopup = ({
  toOffer,
  fromOffer,
  hideInnerPopup,
  showInnerPopup,
  updateList,
  isPopupLoading,
  onCancel,
  onSwitchSuccess,
  isPartOfCancellationFlow,
  switchAlgorithm,
  t
}) => {
  const STEPS = {
    SWITCH_DETAILS: 'SWITCH_DETAILS',
    CONFIRMATION: 'CONFIRMATION',
    ERROR: 'ERROR'
  };

  const STEPS_NUMBERS = {
    SWITCH_DETAILS: 1,
    CONFIRMATION: 2
  };

  const [step, setStep] = useState(STEPS.CONFIRMATION);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const changePlan = async () => {
    setIsLoading(true);

    try {
      const resp = await subscriptionSwitch(
        fromOffer.offerId,
        toOffer.toOfferId,
        toOffer.switchDirection
      );
      if (!resp.errors.length) {
        setIsLoading(false);
        setStep(STEPS.CONFIRMATION);
      } else {
        setError(true);
        setIsLoading(false);
      }
    } catch {
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
        popupTitle={t('Change Plan')}
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

  const fromOfferTitle = fromOffer.offerTitle;
  const fromExpiresAt = dateFormat(fromOffer.expiresAt);

  const toOfferTitle = toOffer.title;
  const toNextPaymentPrice = toOffer.nextPaymentPrice;
  const toNextPaymentPriceCurrencySymbol =
    toOffer.nextPaymentPriceCurrencySymbol;

  return (
    <InnerPopupWrapper
      steps={isPartOfCancellationFlow ? 3 : 2}
      popupTitle={t('Change Plan')}
      currentStep={
        isPartOfCancellationFlow ? STEPS_NUMBERS[step] + 1 : STEPS_NUMBERS[step]
      }
    >
      {step === STEPS.SWITCH_DETAILS && !isError && (
        <>
          <ContentStyled>
            <ImageWrapper>
              <SubscriptionIconStyled
                period={fromOffer.period}
                showLabel="Current"
              />
              <ArrowStyled />
              <SubscriptionIconStyled period={toOffer.period} showLabel="New" />
            </ImageWrapper>
            <TitleStyled step={step}>{t(toOffer.switchDirection)}</TitleStyled>
            <TextStyled step={step}>
              {t(
                'You are about to change your plan from {{ fromOfferTitle }} to {{ toOfferTitle }}.',
                {
                  fromOfferTitle,
                  toOfferTitle
                }
              )}{' '}
              {switchAlgorithm === 'IMMEDIATE_WITHOUT_PRORATION' &&
                t(
                  'You will be immediately granted with access to your selected plan and charged a new price {{ currencySymbol }}{{ nextPaymentPrice }} on your next billing date {{ expiresAt }}',
                  {
                    currencySymbol: toNextPaymentPriceCurrencySymbol,
                    nextPaymentPrice: toNextPaymentPrice,
                    expiresAt: fromExpiresAt
                  }
                )}
              {switchAlgorithm === 'IMMEDIATE_AND_CHARGE_WITH_REFUND' &&
                t(
                  'You will be charged {{ currencySymbol }}{{ nextPaymentPrice }} and immediately granted with access to your selected plan. The remaining value from the previous subscription will be refunded. You will continue to be charged {{ currencySymbol }}{{ nextPaymentPrice }} on a recurring basis until you cancel.',
                  {
                    currencySymbol: toNextPaymentPriceCurrencySymbol,
                    nextPaymentPrice: toNextPaymentPrice
                  }
                )}
              {switchAlgorithm === 'DEFERRED' &&
                t(
                  'You will have access to {{ currentPlan }} until {{ expiresAt }} and from that time you will be charged {{ currencySymbol }}{{ nextPaymentPrice }} on a recurring basis and have access to your new subscription.',
                  {
                    currentPlan: fromOfferTitle,
                    currencySymbol: toNextPaymentPriceCurrencySymbol,
                    nextPaymentPrice: toNextPaymentPrice,
                    expiresAt: fromExpiresAt
                  }
                )}
              <br />
              {toOffer.couponNotApplicable && (
                <>
                  <br />
                  {t(
                    'Your current coupon will not apply to the new plan. If you have a coupon for your new plan, you can apply it after confirming your switch.'
                  )}
                  <br />
                </>
              )}
              <br />
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
                } else if (onCancel) {
                  onCancel();
                } else {
                  hideInnerPopup();
                }
              }}
            >
              {t('Keep Current Plan')}
            </Button>
            <Button theme="confirm" onClickFn={changePlan}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t(`Change Plan`)
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
            <TitleStyled step={step}>{t('Thank you')}</TitleStyled>
            <TextStyled step={step}>
              {switchAlgorithm === 'IMMEDIATE_WITHOUT_PRORATION' &&
                t(
                  'You have successfully changed your plan to {{ newPlan }}. Your new fee will be {{ currencySymbol }}{{ nextPaymentPrice }} starting from {{ expiresAt }}.',
                  {
                    newPlan: toOffer.title,
                    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol,
                    nextPaymentPrice: toOffer.nextPaymentPrice,
                    expiresAt: dateFormat(fromOffer.expiresAt)
                  }
                )}
              {switchAlgorithm === 'IMMEDIATE_AND_CHARGE_WITH_REFUND' &&
                t(
                  'You have successfully changed your plan to {{ newPlan }}. Your new fee is {{ currencySymbol }}{{ nextPaymentPrice }} starting from now.',
                  {
                    newPlan: toOffer.title,
                    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol,
                    nextPaymentPrice: toOffer.nextPaymentPrice
                  }
                )}
              {switchAlgorithm === 'DEFERRED' &&
                t(
                  'You have successfully requested the switch to {{ newPlan }}. You will have access to your new plan on {{ expiresAt }} and be charged {{ currencySymbol }}{{ nextPaymentPrice }}.',
                  {
                    newPlan: toOffer.title,
                    expiresAt: dateFormat(fromOffer.expiresAt),
                    currencySymbol: toOffer.nextPaymentPriceCurrencySymbol,
                    nextPaymentPrice: toOffer.nextPaymentPrice
                  }
                )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button
              theme="confirm"
              onClickFn={onSwitchSuccess || closePopupAndRefresh}
            >
              {t('Back to settings')}
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
                'We have been unable to change your plan to {{ title }} as an error occurred. Sorry for the inconvenience, please try again.',
                {
                  title: toOffer.title
                }
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button
              theme="confirm"
              onClickFn={onSwitchSuccess || closePopupAndRefresh}
            >
              {t('Back to settings')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

SwitchPlanPopup.propTypes = {
  toOffer: PropTypes.objectOf(PropTypes.any),
  fromOffer: PropTypes.objectOf(PropTypes.any),
  hideInnerPopup: PropTypes.func,
  updateList: PropTypes.func,
  isPopupLoading: PropTypes.bool,
  t: PropTypes.func,
  onCancel: PropTypes.func,
  onSwitchSuccess: PropTypes.func,
  isPartOfCancellationFlow: PropTypes.bool,
  showInnerPopup: PropTypes.func,
  switchAlgorithm: PropTypes.string
};

SwitchPlanPopup.defaultProps = {
  toOffer: {},
  fromOffer: {},
  hideInnerPopup: () => {},
  showInnerPopup: () => {},
  updateList: () => {},
  isPopupLoading: false,
  t: k => k,
  onCancel: null,
  onSwitchSuccess: null,
  isPartOfCancellationFlow: false,
  switchAlgorithm: null
};

export { SwitchPlanPopup as PureSwitchPlanPopup };

export default withTranslation()(labeling()(SwitchPlanPopup));
