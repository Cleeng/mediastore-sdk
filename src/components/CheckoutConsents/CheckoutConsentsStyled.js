import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const CheckoutConsentsStyled = styled.div``;

export const CheckoutConsentsContentStyled = styled.div`
  position: relative;

  width: 55%;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 105px;

  text-align: center;

  ${media.small`
  width: 80%;
`}
`;

export const CheckoutConsentsTitleStyled = styled.h3`
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  font-weight: 700;

  color: ${colors.MainColor};
`;

export const CheckoutConsentsSubTitleStyled = styled.h4`
  margin-bottom: 16px;
  font-size: 13px;
  line-height: 22px;
  text-align: center;
  font-weight: 700;

  color: ${colors.MediumGrey};
`;

export const CheckoutConsentsListStyled = styled.div`
  margin-bottom: 36px;
`;

export const CheckoutConsentsCheckbox = styled.div``;

export const CheckoutConsentsError = styled.div`
  width: 100%;
  height: 13px;
  margin-top: 8px;
  content: '';
  color: ${colors.ErrorColor};
  transition: 0.2s ease-in-out;
  font-size: 13px;
  text-align: left;

  ${props =>
    props.center &&
    css`
      text-align: center;
    `}
`;
