import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import updateSubscription from 'api/Customer/updateSubscription';
import { dateFormat } from 'util/planHelper';
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

const Resubscribe = ({ offerDetails, hideInnerPopup, updateList, t }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('Manage your plan')}
      isError={isError}
      currentStep={currentStep}
    >
      {currentStep === 1 ? (
        <>
          <ContentStyled>
            <TitleStyled>{t('Resume your plan')}</TitleStyled>
            <TextStyled>
              {t(
                'By clicking the button below you can resume your plan. Your next bill will be on'
              )}{' '}
              <b>{dateFormat(offerDetails.nextPaymentAt)} </b>
              {t('and it will be')}{' '}
              <b>{`${offerDetails.nextPaymentCurrency}${offerDetails.nextPaymentPrice}`}</b>
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled>
            <Button theme="simple" onClickFn={hideInnerPopup}>
              {t('No, thanks')}
            </Button>
            <Button
              theme="confirm"
              onClickFn={resubscribe}
              disabled={isLoading}
            >
              {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
                t('Resume')}
            </Button>
          </ButtonWrapperStyled>
        </>
      ) : (
        <ContentStyled>
          <img src={checkmarkIcon} alt="checkmark icon" />
          <TitleStyled>{t('Your plan has been renewed')}</TitleStyled>
          <TextStyled>
            {t('You have been successfully resubscribed. Your fee will be')}{' '}
            <b>{`${offerDetails.nextPaymentPrice}${offerDetails.nextPaymentCurrency}`}</b>{' '}
            {t('started from')}{' '}
            <b> {dateFormat(offerDetails.nextPaymentAt)}.</b>
          </TextStyled>
          <Button
            width="auto"
            margin="30px auto 0 auto"
            onClickFn={() => {
              hideInnerPopup();
              updateList();
            }}
          >
            {t('Back to settings')}
          </Button>
        </ContentStyled>
      )}
    </InnerPopupWrapper>
  );
};

Resubscribe.propTypes = {
  hideInnerPopup: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  offerDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func
};

Resubscribe.defaultProps = {
  t: k => k
};

export default withTranslation()(labeling()(Resubscribe));
