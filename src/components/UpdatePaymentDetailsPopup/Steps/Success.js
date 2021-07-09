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
import { ImageWrapper } from '../UpdatePaymentDetailsPopupStyled';

const Success = ({ hideInnerPopup }) => {
  return (
    <>
      <ContentStyled>
        <ImageWrapper>
          <CheckmackIcon />
        </ImageWrapper>
        <TitleStyled>Thank you</TitleStyled>
        <TextStyled>
          Your payment method have been successfully updated.
        </TextStyled>
      </ContentStyled>
      <ButtonWrapperStyled removeMargin>
        <Button theme="simple" onClickFn={() => hideInnerPopup()}>
          Back to settings
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
