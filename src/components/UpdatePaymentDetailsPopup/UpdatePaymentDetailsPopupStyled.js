import React from 'react';
import styled from 'styled-components';
import { LineColor, ErrorColor } from 'styles/variables';
import { ReactComponent as PPIcon } from 'assets/images/paymentMethods/paypal_short.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/remove_icon.svg';

export const ImageWrapper = styled.div.attrs(() => ({
  className: 'msd__popup-content__payment-method-img'
}))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 0 auto 40px auto;
`;

export const PPIconStyled = styled(props => <PPIcon {...props} />)`
  margin-right: 10px;
  filter: brightness(0) invert(1);
`;

export const ErrorMessage = styled.p.attrs(() => ({
  className: 'msd__popup-content__erro'
}))`
  width: 100%;
  color: ${ErrorColor};
  margin: 10px 0;
  text-align: center;
`;

export const RemoveLinkStyled = styled.a.attrs(() => ({
  className: 'msd__popup-content__error-link'
}))`
  color: ${ErrorColor};
  text-decoration: underline;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  &:hover {
    text-decoration: underline;
  }
`;

export const DeleteIconStyled = styled(props => <DeleteIcon {...props} />)`
  margin-inline-end: 10px;
  font-size: 9px;
`;

export const PopupImageStyled = styled.div.attrs(() => ({
  className: 'msd__popup-content__payment-method-image'
}))`
  border: 1px solid ${LineColor};
  border-radius: 10px;
  padding: 15px 25px;
  max-width: 100px;
  margin: auto auto 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaymentMethodsWrapperStyled = styled.div`
  margin-bottom: 20px;
`;
