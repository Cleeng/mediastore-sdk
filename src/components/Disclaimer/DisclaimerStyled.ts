/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { FocusColor, FontColor } from 'styles/variables';

export const DisclaimerStyled = styled.p.attrs(() => ({
  className: 'msd__consents__text'
}))`
  position: relative;
  padding-inline-start: 10px;
  margin-top: 24px;
  font-weight: 400;
  text-align: left;
  user-select: none;
  color: ${FontColor};
  opacity: 0.8;

  a {
    color: ${(props) => props.theme.fontColor || FontColor};
    text-decoration: underline;
    &:focus {
      outline: 2px solid ${FocusColor};
    }
  }
`;

export const TermsLinkStyled = styled.a`
  font-weight: 400;
  font-size: 11px;
  line-height: 17px;
  text-align: left;
  text-decoration: underline;
  opacity: 0.8;
  user-select: none;
`;
