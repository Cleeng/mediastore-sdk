import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as WarningIcon } from 'assets/images/errors/warning.svg';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { Trans, useTranslation } from 'react-i18next';
import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from 'redux/popupSlice';
import { ImageWrapper } from '../UpdatePaymentDetailsPopupStyled';

const Error = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.finalizeAddPaymentDetails);
  const handleTryAgain = () => {
    window.history.replaceState(null, null, window.location.pathname);

    dispatch(
      updatePaymentDetailsPopup({
        step: PAYMENT_DETAILS_STEPS.PAYMENT_DETAILS_UPDATE,
        isLoading: false
      })
    );
  };
  return (
    <>
      <ContentStyled>
        <ImageWrapper>
          <WarningIcon />
        </ImageWrapper>
        <TitleStyled>{t('Oops, something went wrong')}</TitleStyled>
        <TextStyled>
          {error?.includes('Refused') ? (
            <Trans i18nKey="update-payment-error.method">
              We weren’t able to update your payment method. <br /> Please try
              again.
            </Trans>
          ) : (
            <Trans i18nKey="update-payment-error.details">
              We weren’t able to update your payment details. <br /> Please try
              again using different payment method.
            </Trans>
          )}
        </TextStyled>
      </ContentStyled>
      <ButtonWrapperStyled removeMargin>
        <Button theme="simple" onClickFn={handleTryAgain}>
          {t('Try again')}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

export default Error;
