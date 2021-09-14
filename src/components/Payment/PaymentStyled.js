import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const PaymentStyled = styled.div.attrs(() => ({
  className: 'msd__payment'
}))`
  padding: 20px 35px 70px 35px;
  width: 100%;
  background-color: ${colors.BackgroundColor};
  border-top: 1px solid ${colors.LineColor};
  border-bottom: 1px solid ${colors.LineColor};
`;

export const PaymentErrorStyled = styled.div.attrs(() => ({
  className: 'msd__payment--error'
}))`
  text-align: center;
  font-size: 15px;
  color: ${colors.ErrorColor};
`;

export const MethodsWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__payment__methods'
}))`
  margin-bottom: 10px;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  button {
    flex-basis: 200px;
    margin: 10px;

    :not(:disabled):hover,
    :active,
    :focus {
      background-color: ${colors.MediumGrey};
    }
  }
  ${media.smallest`
    button{
      flex-basis: 100%;
    }
  `}
`;

export const PayPalWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__payment__paypal'
}))`
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PayPalTextStyled = styled.p.attrs(() => ({
  className: 'msd__payment__paypal-text'
}))`
  max-width: 50%;
  margin-bottom: 20px;
  text-align: center;
  line-height: 1.4em;
  font-size: 13px;
  ${media.small`
    width: 90%;
    max-width: 400px;
  `}
`;
