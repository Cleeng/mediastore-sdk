import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const CheckoutConsentsStyled = styled.div.attrs(() => ({
  className: 'msd__consents'
}))`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  position: relative;
  background: ${(props) =>
    props.theme.backgroundColor || colors.BackgroundColor};
`;

export const CheckoutConsentsContentStyled = styled.div.attrs(() => ({
  className: 'msd__consents__wrapper'
}))`
  position: relative;

  width: 55%;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 120px;

  text-align: center;

  ${media.small`
  width: 80%;
`}
`;

export const CheckoutConsentsTitleStyled = styled.h2.attrs(() => ({
  className: 'msd__consents__title'
}))`
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  font-weight: 700;

  color: ${(props) => props.theme.fontColor || colors.FontColor};
`;

export const CheckoutConsentsSubTitleStyled = styled.p.attrs(() => ({
  className: 'msd__consents__subtitle'
}))`
  margin-bottom: 16px;
  font-size: 13px;
  line-height: 22px;
  text-align: center;
  font-weight: 700;

  color: ${(props) => props.theme.fontColor || colors.FontColor};
  filter: brightness(1.7);
`;

export const CheckoutConsentsListStyled = styled.ul.attrs(() => ({
  className: 'msd__consents__list'
}))`
  margin-bottom: 36px;
  list-style: none;
`;

export const CheckoutConsentsListItem = styled.li``;

export const CheckoutConsentsError = styled.div.attrs(() => ({
  className: 'msd__consents__error'
}))`
  width: 100%;
  height: 13px;
  margin-top: 8px;
  content: '';
  color: ${(props) => props.theme.errorColor || colors.ErrorColor};
  transition: 0.2s ease-in-out;
  font-size: 13px;
  text-align: left;

  ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
`;
