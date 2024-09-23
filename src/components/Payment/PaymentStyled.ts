import styled from 'styled-components';
import * as colors from 'styles/variables';

export const PaymentStyled = styled.section.attrs(() => ({
  className: 'msd__payment'
}))`
  padding: 20px 35px 70px 35px;
  width: 100%;
  background-color: ${(props) =>
    props.theme.backgroundColor || colors.BackgroundColor};
  border-bottom: 1px solid ${colors.LineColor};
`;

export const PaymentWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__payment__wrapper'
}))`
  max-width: 376px;
  margin: 12px auto 0 auto;
`;

export const PaymentErrorStyled = styled.div.attrs(() => ({
  className: 'msd__payment--error'
}))`
  text-align: center;
  font-size: 15px;
  color: ${(props) => props.theme.errorColor || colors.ErrorColor};
  margin: 30px auto;
`;
