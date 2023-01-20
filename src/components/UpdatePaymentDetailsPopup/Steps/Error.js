import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as WarningIcon } from 'assets/images/errors/warning.svg';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import { updatePaymentDetailsPopup } from 'redux/popupSlice';
import { ImageWrapper } from '../UpdatePaymentDetailsPopupStyled';

const Error = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <>
      <ContentStyled>
        <ImageWrapper>
          <WarningIcon />
        </ImageWrapper>
        <TitleStyled>{t('Oops, something went wrong')}</TitleStyled>
        <TextStyled>
          {t('Your payment details have not been updated.')}
        </TextStyled>
      </ContentStyled>
      <ButtonWrapperStyled removeMargin>
        <Button
          theme="simple"
          onClickFn={() =>
            dispatch(updatePaymentDetailsPopup({ isOpen: false }))
          }
        >
          {t('Back to Payment Details')}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

export default Error;
