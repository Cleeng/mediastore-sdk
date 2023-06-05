import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import updateSubscription from 'api/Customer/updateSubscription';
import { dateFormat, currencyFormat, INFINITE_DATE } from 'util/planHelper';
import checkmarkIcon from 'assets/images/checkmarkBase';

import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';

const Resubscribe = ({ offerDetails, hideInnerPopup, updateList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { t } = useTranslation();

  const { expiresAt, nextPaymentPrice, nextPaymentCurrency } = offerDetails;
  const currencySymbol = currencyFormat[nextPaymentCurrency];

  const resubscribe = async () => {
    window.dispatchEvent(
      new CustomEvent('MSSDK:resume-action-confirmed', {
        detail: {
          offerId: offerDetails.offerId
        }
      })
    );
    try {
      setIsLoading(true);
      const response = await updateSubscription({
        offerId: offerDetails.offerId,
        status: 'active'
      });
      if (response.errors.length) {
        setIsLoading(false);
        setIsError(true);
      } else {
        setIsLoading(false);
        setCurrentStep(2);
      }
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const cancelResubscribeAction = () => {
    window.dispatchEvent(new CustomEvent('MSSDK:resume-action-cancelled'));
    hideInnerPopup();
  };

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('resubscribe-popup.title', 'Manage your plan')}
      isError={isError}
      currentStep={currentStep}
    >
      {currentStep === 1 ? (
        <>
          <ContentStyled>
            <TitleStyled>
              {t('resubscribe-popup.resume-plan', 'Resume your plan')}
            </TitleStyled>
            <TextStyled>
              {t(
                'resubscribe-popup.resume-plan-button-info',
                'By clicking the button below you can resume your plan. Your next bill will be on'
              )}{' '}
              <b>
                {expiresAt === INFINITE_DATE
                  ? t(
                      'resubscribe-popup.next-season-start',
                      'the next season start'
                    )
                  : dateFormat(expiresAt)}{' '}
              </b>
              {t('resubscribe-popup.it-will-be', 'and it will be')}{' '}
              <b>{`${currencySymbol}${nextPaymentPrice}`}</b>.
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="simple" onClickFn={() => cancelResubscribeAction()}>
              {t('resubscribe-popup.no-thanks', 'No, thanks')}
            </Button>
            <Button
              theme="confirm"
              onClickFn={resubscribe}
              disabled={isLoading}
            >
              {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
                t('resubscribe-popup.resume', 'Resume')}
            </Button>
          </ButtonWrapperStyled>
        </>
      ) : (
        <ContentStyled>
          <img src={checkmarkIcon} alt="checkmark icon" />
          <TitleStyled>
            {t('resubscribe-popup.plan-renewed', 'Your plan has been renewed')}
          </TitleStyled>
          <TextStyled>
            {t(
              'resubscribe-popup.resubscribed',
              'You have been successfully resubscribed. Your fee will be'
            )}{' '}
            <b>{`${currencySymbol}${nextPaymentPrice}`}</b>{' '}
            {t('resubscribe-popup.started-from', 'started from')}{' '}
            <b>
              {expiresAt === INFINITE_DATE
                ? t(
                    'resubscribe-popup.next-season-start',
                    'the next season start'
                  )
                : dateFormat(expiresAt)}
              .
            </b>
          </TextStyled>
          <Button
            width="auto"
            margin="30px auto 0 auto"
            onClickFn={() => {
              hideInnerPopup();
              updateList();
            }}
          >
            {t('resubscribe-popup.back-to-my-account', 'Back to My Account')}
          </Button>
        </ContentStyled>
      )}
    </InnerPopupWrapper>
  );
};

Resubscribe.propTypes = {
  hideInnerPopup: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  offerDetails: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Resubscribe;
