import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as WarningIcon } from 'assets/images/errors/warning.svg';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import { ImageWrapper } from '../UpdatePaymentDetailsPopupStyled';

const Error = ({ hideInnerPopup }) => {
  const { t } = useTranslation();
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
        <Button theme="simple" onClickFn={() => hideInnerPopup()}>
          {t('Back to Payment Details')}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

Error.propTypes = {
  hideInnerPopup: PropTypes.func
};

Error.defaultProps = {
  hideInnerPopup: () => {}
};

export default Error;
