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
  margin-bottom: 50px;
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
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #D3DBE6;
  border-radius: 0 0 12px 12px;
  border-top: none;
  cursor: pointer;
  background-color: ${colors.White};
  padding-left: 25px;
`;

export const PayPalTextStyled = styled.p.attrs(() => ({
  className: 'msd__payment__paypal-text'
}))`
  max-width: 550px;
  margin: 0;
  padding: 4px;
  text-align: center;
  line-height: 1.4em;
  color: #00112c;
  cursor: pointer;
  font-size: 1em;
  font-weight: 400;
  display: flex;
  align-items: center;
  ${media.small`
    width: 90%;
    max-width: 400px;
  `}
`;

export const LegalNoteWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__payment__legal'
}))`
  margin: 25px auto 0 auto;
  text-align: center;
  max-width: 550px;
`;

export const LegalTextStyled = styled.p`
  font-size: 11px;
  line-height: 17px;
  font-weight: 400;
  color: ${colors.MyAccountTextGray};
`;

export const PayPalIconWrapper = styled.div`
  border: 1px solid #A9A9BF;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 26px;
  border-radius: 4px;
`;
