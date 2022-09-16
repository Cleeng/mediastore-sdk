import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
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
  onSwitchError,
  isPartOfCancellationFlow,
  t
}) => {
  const STEPS = {
    SWITCH_DETAILS: 'SWITCH_DETAILS',
    CONFIRMATION: 'CONFIRMATION'
  };

  const STEPS_NUMBERS = {
    SWITCH_DETAILS: 1,
    CONFIRMATION: 2
  };

  const [step, setStep] = useState(STEPS.SWITCH_DETAILS);
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
              <Trans i18nKey="switchplanpopup-info">
                You are about to change your plan from{' '}
                <strong>{{ fromOfferTitle: fromOffer.offerTitle }}</strong> to{' '}
                <strong>{{ toOfferTitle: toOffer.title }}</strong>.
              </Trans>{' '}
              {toOffer.algorithm === 'IMMEDIATE_WITHOUT_PRORATION' && (
                <Trans i18nKey="switchplanpopup-info-immediatewithoutproration">
                  You will be immediately granted with access to your selected
                  plan and charged a new price{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  on your next billing date{' '}
                  <strong>
                    {{ expiresAt: dateFormat(fromOffer.expiresAt) }}
                  </strong>
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_REFUND' && (
                <Trans i18nKey="switchplanpopup-info-immediateandchargewithrefund">
                  You will be charged{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  and immediately granted with access to your selected plan. The
                  remaining value from the previous subscription will be
                  refunded. You will continue to be charged{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  on a recurring basis until you cancel.
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITH_FULL_REFUND' && (
                <Trans i18nKey="switchplanpopup-info-immediateandchargewithfullrefund">
                  You will be charged{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>
                  . You will also be fully refunded for your previous
                  subscription. You will continue to be charged{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  on a recurring basis until you cancel.
                </Trans>
              )}
              {toOffer.algorithm === 'DEFERRED' && (
                <Trans i18nKey="switchplanpopup-info-deferred">
                  You will have access to{' '}
                  <strong>{{ currentPlan: fromOffer.offerTitle }}</strong> until{' '}
                  <strong>
                    {{ expiresAt: dateFormat(fromOffer.expiresAt) }}
                  </strong>{' '}
                  and from that time you will be charged{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  on a recurring basis and have access to your new subscription.
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_FULL_PRICE' && (
                <Trans i18nKey="switchplanpopup-info-immediateandchargefullprice">
                  You will be charged{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  and immediately granted access to the selected plan. The
                  remaining value from the previous subscription won`t be
                  refunded. You will continue to be charged{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  on a recurring basis until you cancel.
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION' && (
                <Trans i18nKey="switchplanpopup-info-immediateandchargewithoutproration">
                  You will be charged{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  and immediately granted with access to the selected plan.
                </Trans>
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
            <TitleStyled step={step}>{t('Thank you!')}</TitleStyled>
            <TextStyled step={step}>
              {toOffer.algorithm === 'IMMEDIATE_WITHOUT_PRORATION' && (
                <Trans i18nKey="switchplanpopup-confirm-immediatewithoutproration">
                  You have successfully changed your plan to{' '}
                  <strong>{{ newPlan: toOffer.title }}</strong>. Your new fee
                  will be{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  starting from{' '}
                  <strong>
                    {{ expiresAt: dateFormat(fromOffer.expiresAt) }}
                  </strong>
                  .
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_REFUND' && (
                <Trans i18nKey="switchplanpopup-confirm-immediateandchargewithrefund">
                  You have successfully changed your plan to{' '}
                  <strong>{{ newPlan: toOffer.title }}</strong>. Your new fee is{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  starting from now.
                </Trans>
              )}
              {toOffer.algorithm === 'DEFERRED' && (
                <Trans i18nKey="switchplanpopup-confirm-deferred">
                  You have successfully requested the switch to{' '}
                  <strong>{{ newPlan: toOffer.title }}</strong>. You will have
                  access to your new plan on{' '}
                  <strong>
                    {{ expiresAt: dateFormat(fromOffer.expiresAt) }}
                  </strong>{' '}
                  and be charged{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>
                  .
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_FULL_PRICE' && (
                <Trans i18nKey="switchplanpopup-confirm-immediateandchargefullprice">
                  You have successfully changed your plan to{' '}
                  <strong>{{ newPlan: toOffer.title }}</strong>. Your new fee
                  will be{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  starting from{' '}
                  <strong>
                    {{ expiresAt: dateFormat(fromOffer.expiresAt) }}
                  </strong>
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITH_FULL_REFUND' && (
                <Trans i18nKey="switchplanpopup-confirm-immediateandchargewithfullrefund">
                  You have successfully changed your plan to{' '}
                  <strong>{{ newPlan: toOffer.title }}</strong>. Your new fee
                  will be{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  starting from{' '}
                  <strong>
                    {{ expiresAt: dateFormat(fromOffer.expiresAt) }}
                  </strong>
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION' && (
                <Trans i18nKey="switchplanpopup-confirm-immediateandchargewithoutproration">
                  You have successfully changed your plan to{' '}
                  <strong>{{ newPlan: toOffer.title }}</strong>. Your new fee
                  will be{' '}
                  <strong>
                    {{ currencySymbol: toOffer.nextPaymentPriceCurrencySymbol }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  starting from now.
                </Trans>
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
              onClickFn={onSwitchError || closePopupAndRefresh}
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
  onSwitchError: PropTypes.func,
  isPartOfCancellationFlow: PropTypes.bool,
  showInnerPopup: PropTypes.func
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
  onSwitchError: null,
  isPartOfCancellationFlow: false
};

export { SwitchPlanPopup as PureSwitchPlanPopup };

export default withTranslation()(labeling()(SwitchPlanPopup));
