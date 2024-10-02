import React from 'react';
import { useDispatch } from 'react-redux';
import CheckmarkIcon from 'assets/images/greenCheckmark.svg';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import { resetPaymentDetailsPopupState } from 'appRedux/popupSlice';
import { ImageWrapper } from '../UpdatePaymentDetailsPopupStyled';

const Success = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <ContentStyled>
        <ImageWrapper>
          <CheckmarkIcon />
        </ImageWrapper>
        <TitleStyled>
          {t('update-payment-details-popup.success.title', 'Success')}
        </TitleStyled>
        <TextStyled>
          {t(
            'update-payment-details-popup.success.info',
            'Your payment details have been updated and will be visible on your account shortly.'
          )}
        </TextStyled>
      </ContentStyled>
      <ButtonWrapperStyled $removeMargin>
        <Button
          variant='simple'
          onClickFn={() => dispatch(resetPaymentDetailsPopupState())}
        >
          {t(
            'update-payment-details-popup.success.back',
            'Back to Payment Details'
          )}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

export default Success;
