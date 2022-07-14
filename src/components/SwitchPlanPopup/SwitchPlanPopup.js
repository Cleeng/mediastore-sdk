/* eslint-disable prettier/prettier */
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
} from './SwitchPlanPopupStyled';

const SwitchPlanPopup = ({
  toOffer,
  fromOffer,
  hideInnerPopup,
  updateList,
  isPopupLoading,
  onCancel,
  onSwitchSuccess,
  t
}) => {
  const [step, setStep] = useState(1);
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
        setStep(2);
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
  const toNextPaymentPriceCurrencySymbol = toOffer.nextPaymentPriceCurrencySymbol;

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('Change Plan')}
      isError={isError}
      currentStep={step}
    >
      {step === 1 ? (
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
              <Trans>
                You are about to change your plan from <b>{{ fromOfferTitle }}</b> to <b>{{ toOfferTitle }}</b>. You will be charged the new price <b>{{ toNextPaymentPriceCurrencySymbol }}{{ toNextPaymentPrice }}</b> on your next billing date <b>{{ fromExpiresAt }}</b>.
              </Trans>
              <br />
              { toOffer.couponNotApplicable && (
                <>
                  <br />
                  {t('Your current coupon will not apply to the new plan. If you have a coupon for your new plan, you can apply it after confirming your switch.')}
                  <br />
                </>
              )}
              <br />
              {t('Do you want to apply the change now?')}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={onCancel || hideInnerPopup}>
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
      ) : (
        <>
          <ContentStyled>
            <ImageWrapper>
              <ImageStyled src={checkmarkIcon} alt="checkmark icon" />
            </ImageWrapper>
            <TitleStyled step={step}>{t('Thank you')}</TitleStyled>
            <TextStyled step={step}>
              {t(
                'You have successfully changed your plan. Your new fee will be '
              )}
              <strong>
                {toOffer.nextPaymentPriceCurrencySymbol}
                {toOffer.nextPaymentPrice}
              </strong>{' '}
              {t('starting from ')}
              <strong> {dateFormat(fromOffer.expiresAt)}</strong>.
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
  onSwitchSuccess: PropTypes.func
};

SwitchPlanPopup.defaultProps = {
  toOffer: {},
  fromOffer: {},
  hideInnerPopup: () => {},
  updateList: () => {},
  isPopupLoading: false,
  t: k => k,
  onCancel: null,
  onSwitchSuccess: null
};

export { SwitchPlanPopup as PureSwitchPlanPopup };

export default withTranslation()(labeling()(SwitchPlanPopup));
