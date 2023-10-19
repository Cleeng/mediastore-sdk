import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import formatNumber from 'util/formatNumber';
import isPriceTemporaryModified from 'util/isPriceTemporaryModified';

import { subscriptionSwitch } from 'api';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import { dateFormat, INFINITE_DATE, currencyFormat } from 'util/planHelper';
import checkmarkIcon from 'assets/images/checkmarkBase';
import { ReactComponent as Close } from 'assets/images/errors/close.svg';
import { updateList } from 'redux/planDetailsSlice';
import { hidePopup, showPopup } from 'redux/popupSlice';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import SkeletonWrapper from 'components/SkeletonWrapper';
import { POPUP_TYPES } from 'redux/innerPopupReducer';
import eventDispatcher, {
  MSSDK_SWITCH_POPUP_ACTION_SUCCESSFUL
} from 'util/eventDispatcher';
import {
  ImageWrapper,
  ArrowStyled,
  SubscriptionIconStyled,
  ImageStyled
} from './SwitchPlanPopupStyled';

const SwitchPlanPopup = ({ onCancel, onSwitchSuccess, onSwitchError }) => {
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

  const { offerToSwitch: fromOffer } = useSelector(state => state.plan);
  const {
    isLoading: isPopupLoading,
    switchPlan: { offerData: toOffer, isPartOfCancellationFlow }
  } = useSelector(state => state.popupManager);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const changePlan = async () => {
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
    dispatch(hidePopup());
    dispatch(updateList());
  };

  if (isPopupLoading) {
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('switchplan-popup.change-plan', 'Change Plan')}
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
      popupTitle={t('switchplan-popup.change-plan', 'Change Plan')}
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
                gray
              />
              <ArrowStyled />
              <SubscriptionIconStyled period={toOffer.period} showLabel="New" />
            </ImageWrapper>
            <TitleStyled $step={step} $textTransform="capitalize">
              {t(
                `switchplan-popup.${toOffer.switchDirection}-title`,
                toOffer.switchDirection
              )}
            </TitleStyled>
            <TextStyled step={step}>
              <Trans i18nKey="switchplan-popup-info">
                You are about to change your plan from{' '}
                <strong>
                  {{
                    fromOfferTitle: t(
                      `offer-title-${fromOffer.offerId}`,
                      fromOffer.offerTitle
                    )
                  }}
                </strong>{' '}
                to{' '}
                <strong>
                  {{
                    toOfferTitle: t(
                      `offer-title-${toOffer.toOfferId}`,
                      toOffer.title
                    )
                  }}
                </strong>
                .
              </Trans>{' '}
              {toOffer.algorithm === 'IMMEDIATE_WITHOUT_PRORATION' && (
                <Trans i18nKey="switchplan-popup-info-immediatewithoutproration">
                  You will be immediately granted access to your selected plan
                  and charged a new price{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      currentPrice: isPriceTemporaryModified(toOffer.toOfferId)
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  on your next billing date{' '}
                  <strong>
                    {{
                      expiresAt:
                        fromOffer.expiresAt === INFINITE_DATE
                          ? t(
                              'switchplan-popup.when-next-season-start',
                              'when the next season start'
                            )
                          : dateFormat(fromOffer.expiresAt)
                    }}
                  </strong>
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_REFUND' && (
                <Trans i18nKey="switchplan-popup-info-immediateandchargewithrefund">
                  You will be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      currentPrice: isPriceTemporaryModified(toOffer.toOfferId)
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  and immediately granted access to your selected plan. The
                  remaining value from the previous subscription will be
                  refunded. You will continue to be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  on a recurring basis until you cancel.
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITH_FULL_REFUND' && (
                <Trans i18nKey="switchplan-popup-info-immediateandchargewithfullrefund">
                  You will be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      currentPrice: isPriceTemporaryModified(toOffer.toOfferId)
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>
                  . You will also be fully refunded for your previous
                  subscription. You will continue to be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  on a recurring basis until you cancel.
                </Trans>
              )}
              {toOffer.algorithm === 'DEFERRED' && (
                <Trans i18nKey="switchplan-popup-info-deferred">
                  You will continue to have access to{' '}
                  <strong>
                    {{
                      currentPlan: t(
                        `offer-title-${fromOffer.offerId}`,
                        fromOffer.offerTitle
                      )
                    }}
                  </strong>{' '}
                  until{' '}
                  <strong>
                    {{
                      expiresAt:
                        fromOffer.expiresAt === INFINITE_DATE
                          ? t(
                              'switchplan-popup.next-season-start',
                              'the next season start'
                            )
                          : dateFormat(fromOffer.expiresAt)
                    }}
                  </strong>
                  . From that time you will be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  on a recurring basis for your new subscription.
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_FULL_PRICE' && (
                <Trans i18nKey="switchplan-popup-info-immediateandchargefullprice">
                  You will be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      currentPrice: isPriceTemporaryModified(toOffer.toOfferId)
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  and immediately granted access to the selected plan. You will
                  continue to be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  on a recurring basis until you cancel.
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION' && (
                <Trans i18nKey="switchplan-popup-info-immediateandchargewithoutproration">
                  You will be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      currentPrice: isPriceTemporaryModified(toOffer.toOfferId)
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  and immediately granted access to the selected plan.
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_WITH_TIME_PRORATION' && (
                <Trans i18nKey="switchplan-popup-info-immediatewithtimeproration">
                  You will be immediately granted access to your selected plan.
                  Your next billing date will be changed and pushed towards,
                  based on the time left on your previous subscription. From
                  that time, you will be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  on a recurring basis.
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITH_TIME_PRORATION' && (
                <Trans i18nKey="switchplan-popup-info-immediateandchargewithtimeproration">
                  You will be immediately charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      currentPrice: isPriceTemporaryModified(toOffer.toOfferId)
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  and granted access to the selected plan. Your next billing
                  date will be changed and pushed towards, based on the time
                  left on your previous subscription.{' '}
                </Trans>
              )}
              <br />
              {toOffer.couponNotApplicable && (
                <>
                  <br />
                  {t(
                    'switchplan-popup.coupon-will-not-apply',
                    'Your current coupon will not apply to the new plan. If you have a coupon for your new plan, you can apply it after confirming your switch.'
                  )}
                  <br />
                </>
              )}
              <br />
              {isPriceTemporaryModified(toOffer.toOfferId) && (
                <>
                  <br />
                  {t(
                    'switchplan-popup.price-without-taxes',
                    'Note, the presented price does not include taxes.'
                  )}
                  <br />
                </>
              )}
              <br />
              {t(
                'switchplan-popup.apply-change-question',
                'Do you want to apply the change now?'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled $removeMargin>
            <Button
              theme="simple"
              onClickFn={() => {
                if (isPartOfCancellationFlow) {
                  dispatch(
                    showPopup({
                      type: POPUP_TYPES.updateSubscription,
                      data: {
                        action: 'unsubscribe',
                        offerData: {
                          ...fromOffer
                        }
                      }
                    })
                  );
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
                  dispatch(hidePopup());
                }
              }}
            >
              {t('switchplan-popup.resign-button', 'Keep Current Plan')}
            </Button>
            <Button theme="confirm" onClickFn={changePlan}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t('switchplan-popup.confirm-button', 'Change Plan')
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
            <TitleStyled $step={step}>
              {t('switchplan-popup.success.header', 'Thank You!')}
            </TitleStyled>
            <TextStyled $step={step}>
              {toOffer.algorithm === 'IMMEDIATE_WITHOUT_PRORATION' && (
                <Trans i18nKey="switchplan-popup-confirm-immediatewithoutproration">
                  You have successfully changed your plan to{' '}
                  <strong>
                    {{
                      newPlan: t(
                        `offer-title-${toOffer.toOfferId}`,
                        toOffer.title
                      )
                    }}
                  </strong>
                  . Your new fee will be{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  starting from{' '}
                  <strong>
                    {{
                      expiresAt:
                        fromOffer.expiresAt === INFINITE_DATE
                          ? t(
                              'switchplan-popup.next-season-start',
                              'the next season start'
                            )
                          : dateFormat(fromOffer.expiresAt)
                    }}
                  </strong>
                  .
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_WITH_REFUND' && (
                <Trans i18nKey="switchplan-popup-confirm-immediateandchargewithrefund">
                  You have successfully changed your plan to{' '}
                  <strong>
                    {{
                      newPlan: t(
                        `offer-title-${toOffer.toOfferId}`,
                        toOffer.title
                      )
                    }}
                  </strong>
                  . Your new fee is{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: isPriceTemporaryModified(
                        toOffer.toOfferId
                      )
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  starting from now.
                </Trans>
              )}
              {toOffer.algorithm === 'DEFERRED' && (
                <Trans i18nKey="switchplan-popup-confirm-deferred">
                  You have successfully requested the switch to{' '}
                  <strong>
                    {{
                      newPlan: t(
                        `offer-title-${toOffer.toOfferId}`,
                        toOffer.title
                      )
                    }}
                  </strong>
                  . You will have access to your new plan on{' '}
                  <strong>
                    {{
                      expiresAt:
                        fromOffer.expiresAt === INFINITE_DATE
                          ? t(
                              'switchplan-popup.next-season-start',
                              'the next season start'
                            )
                          : dateFormat(fromOffer.expiresAt)
                    }}
                  </strong>{' '}
                  and be charged{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>
                  .
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_AND_CHARGE_FULL_PRICE' && (
                <Trans i18nKey="switchplan-popup-confirm-immediateandchargefullprice">
                  You have successfully changed your plan to{' '}
                  <strong>
                    {{
                      newPlan: t(
                        `offer-title-${toOffer.toOfferId}`,
                        toOffer.title
                      )
                    }}
                  </strong>
                  . Your new fee will be{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: isPriceTemporaryModified(
                        toOffer.toOfferId
                      )
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  starting from now.
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITH_FULL_REFUND' && (
                <Trans i18nKey="switchplan-popup-confirm-immediateandchargewithfullrefund">
                  You have successfully changed your plan to{' '}
                  <strong>
                    {{
                      newPlan: t(
                        `offer-title-${toOffer.toOfferId}`,
                        toOffer.title
                      )
                    }}
                  </strong>
                  . Your new fee will be{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: isPriceTemporaryModified(
                        toOffer.toOfferId
                      )
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  starting from now.
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITHOUT_PRORATION' && (
                <Trans i18nKey="switchplan-popup-confirm-immediateandchargewithoutproration">
                  You have successfully changed your plan to{' '}
                  <strong>
                    {{
                      newPlan: t(
                        `offer-title-${toOffer.toOfferId}`,
                        toOffer.title
                      )
                    }}
                  </strong>
                  . Your new fee will be{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{
                      nextPaymentPrice: isPriceTemporaryModified(
                        toOffer.toOfferId
                      )
                        ? formatNumber(toOffer.price)
                        : formatNumber(toOffer.nextPaymentPrice)
                    }}
                  </strong>{' '}
                  starting from now.
                </Trans>
              )}
              {toOffer.algorithm === 'IMMEDIATE_WITH_TIME_PRORATION' && (
                <Trans i18nKey="switchplan-popup-confirm-immediatewithtimeproration">
                  You have successfully changed your plan to{' '}
                  <strong>
                    {{
                      newPlan: t(
                        `offer-title-${toOffer.toOfferId}`,
                        toOffer.title
                      )
                    }}
                  </strong>
                  . Your new fee will be{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  and you will be charged on a recurring basis until you cancel.
                </Trans>
              )}
              {toOffer.algorithm ===
                'IMMEDIATE_AND_CHARGE_WITH_TIME_PRORATION' && (
                <Trans i18nKey="switchplan-popup-confirm-immediateandchargewithtimeproration">
                  You have successfully changed your plan to{' '}
                  <strong>
                    {{
                      newPlan: t(
                        `offer-title-${toOffer.toOfferId}`,
                        toOffer.title
                      )
                    }}
                  </strong>
                  . Your new fee will be{' '}
                  <strong>
                    {{
                      currencySymbol:
                        currencyFormat[toOffer.nextPaymentPriceCurrency]
                    }}
                    {{ nextPaymentPrice: toOffer.nextPaymentPrice }}
                  </strong>{' '}
                  and you will be charged on a recurring basis until you cancel.
                </Trans>
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button
              theme="confirm"
              onClickFn={onSwitchSuccess || closePopupAndRefresh}
            >
              {t('switchplan-popup.back-button', 'Back to My Account')}
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
            <TitleStyled $step={step}>
              {t('switchplan-popup.error-title', 'An error occurred.')}
            </TitleStyled>
            <TextStyled step={step}>
              {t(
                'switchplan-popup.error-description',
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
              {t('switchplan-popup.back-button', 'Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

SwitchPlanPopup.propTypes = {
  onCancel: PropTypes.func,
  onSwitchSuccess: PropTypes.func,
  onSwitchError: PropTypes.func
};

SwitchPlanPopup.defaultProps = {
  onCancel: null,
  onSwitchSuccess: null,
  onSwitchError: null
};

export { SwitchPlanPopup as PureSwitchPlanPopup };

export default SwitchPlanPopup;
