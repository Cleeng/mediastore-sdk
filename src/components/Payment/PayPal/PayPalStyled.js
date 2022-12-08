import styled from 'styled-components';

export const PayPalContentStyled = styled.div.attrs(() => ({
  className: 'msd__paypal--wrapper'
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 26px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 11px;
`;

export const PayPalIconContentStyled = styled.div.attrs(() => ({
  className: 'msd__paypal--icon'
}))`
  padding-bottom: 20px;
`;
