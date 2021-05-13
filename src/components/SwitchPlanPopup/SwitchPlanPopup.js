import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import { subscriptionSwitch } from 'api';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import { dateFormat } from 'util/planHelper';
import checkmarkIcon from 'assets/images/checkmark.svg';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
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
            <TextStyled
              step={step}
              dangerouslySetInnerHTML={{
                __html: `${t(`You are about to change your plan from <b>
                  ${fromOffer.offerTitle}</b> to <b> 
                  ${toOffer.title} </b>. You will be charged the new price <b>
                  ${toOffer.nextPaymentPrice}${
                  toOffer.nextPaymentPriceCurrencySymbol
                } 
                  </b> on your next billing date <b>
                  ${dateFormat(fromOffer.expiresAt)}</b>.`)}
                  <br />
                  ${
                    toOffer.couponNotApplicable
                      ? `<br />
                    ${t(
                      'Your current coupon will not apply to the new plan. If you have a coupon for your new plan, you can apply it after confirming your switch.'
                    )} <br />`
                      : ''
                  }
                  <br /> ${t('Do you want to apply the change now?')}`
              }}
            />
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={hideInnerPopup}>
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
                {toOffer.nextPaymentPrice}
                {toOffer.nextPaymentPriceCurrencySymbol}
              </strong>{' '}
              {t('starting from ')}
              <strong> {dateFormat(fromOffer.expiresAt)}</strong>.
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="confirm" onClickFn={closePopupAndRefresh}>
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
  t: PropTypes.func
};

SwitchPlanPopup.defaultProps = {
  toOffer: {},
  fromOffer: {},
  hideInnerPopup: () => {},
  updateList: () => {},
  t: k => k
};

export { SwitchPlanPopup as PureSwitchPlanPopup };

export default withTranslation()(labeling()(SwitchPlanPopup));
