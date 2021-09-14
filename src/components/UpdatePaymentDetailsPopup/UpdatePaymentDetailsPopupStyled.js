/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { LineColor, MainColor, ErrorColor } from 'styles/variables';
import { ReactComponent as PPIcon } from 'assets/images/paymentMethods/paypal_short.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/remove_icon.svg';

export const PaymentMethodStyled = styled.button.attrs(() => ({
  className: 'msd__popup-content__payment-method'
}))`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 350px;
  margin: auto auto 15px auto;
  padding: 30px;

  border: 1px solid ${LineColor};
  border-radius: 12px;
  background: transparent;

  color: ${MainColor};
  text-align: left;
  cursor: pointer;
  &:active {
    border: 1px solid ${LineColor};
  }
  &:hover {
    border: 1px solid ${MainColor};
  }
`;

export const PaymentMethodTextStyled = styled.div`
  margin-left: 20px;
`;

export const PaymentMethodTitleStyled = styled.div.attrs(() => ({
  className: 'msd__popup-content__payment-method-title'
}))`
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 14px;
  width: 100%;
`;

export const PaymentMethodDescStyled = styled.div.attrs(() => ({
  className: 'msd__popup-content__payment-method-description'
}))`
  font-weight: 300;
  font-size: 12px;
`;
export const PaymentMethodIconStyled = styled.div.attrs(() => ({
  className: 'msd__popup-content__payment-method-icon'
}))`
  path {
    fill: ${MainColor};
  }
`;

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
  &:hover {
    text-decoration: underline;
  }
`;

export const DeleteIconStyled = styled(props => <DeleteIcon {...props} />)`
  margin-right: 10px;
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
