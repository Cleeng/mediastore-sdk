import styled from 'styled-components';
import * as colors from 'styles/variables';

export const PaymentStyled = styled.section.attrs(() => ({
  className: 'msd__payment'
}))`
  padding: 20px 35px 70px 35px;
  width: 100%;
  background-color: ${colors.BackgroundColor};
  border-bottom: 1px solid ${colors.LineColor};
`;

export const PaymentWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__payment__wrapper'
}))`
  max-width: 375px;
  margin: 12px auto 0 auto;
`;

export const PaymentErrorStyled = styled.div.attrs(() => ({
  className: 'msd__payment--error'
}))`
  text-align: center;
  font-size: 15px;
  color: ${colors.ErrorColor};
  margin: 30px auto;
`;

export const LegalNoteWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__payment__legal'
}))`
  margin: 25px auto 0 auto;
  text-align: center;
  max-width: 550px;
`;

export const LegalTextStyled = styled.p<{ marginBottom: string }>`
  font-size: 11px;
  margin-bottom: ${({ marginBottom }) => marginBottom};
  line-height: 17px;
  font-weight: 400;
  color: ${colors.MyAccountTextGray};
`;
