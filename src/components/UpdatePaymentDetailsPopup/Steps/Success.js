import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CheckmackIcon } from 'assets/images/greenCheckmark.svg';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import { ImageWrapper } from '../UpdatePaymentDetailsPopupStyled';

const Success = ({ hideInnerPopup }) => {
  const { t } = useTranslation();
  return (
    <>
      <ContentStyled>
        <ImageWrapper>
          <CheckmackIcon />
        </ImageWrapper>
        <TitleStyled>{t('Thank you!')}</TitleStyled>
        <TextStyled>{t('Your payment details have been updated')}</TextStyled>
      </ContentStyled>
      <ButtonWrapperStyled removeMargin>
        <Button theme="simple" onClickFn={() => hideInnerPopup()}>
          {t('Back to settings')}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

Success.propTypes = {
  hideInnerPopup: PropTypes.func
};

Success.defaultProps = {
  hideInnerPopup: () => {}
};

export default Success;
