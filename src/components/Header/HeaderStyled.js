import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';
import { LogoUrl } from 'styles/variables';
import { isRTL } from 'styles/RTLHelper';
import logoSrc from './img/logoBase64';

export const HeaderStyled = styled.header.attrs(() => ({
  className: 'msd__header'
}))`
  display: flex;
  position: relative;

  padding: 0 40px;

  background-color: ${colors.BackgroundColor};
  border-bottom: 1px ${colors.LineColor} solid;

  text-align: center;

  ${(props) =>
    props.switchOff &&
    css`
      display: none;
    `}
`;

export const LogoStyled = styled.div.attrs(() => ({
  className: 'msd__header__logo'
}))`
  height: 80px;
  width: 100%;

  background-image: url(${LogoUrl || logoSrc});
  background-size: auto 35%;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ArrowStyled = styled.span`
  width: 13px;
  height: 13px;
  align-self: center;

  border-top: 2px solid ${colors.LineColor};
  border-right: 2px solid ${colors.LineColor};

  transform: rotate(225deg);

  &:hover {
    cursor: pointer;
  }
  /* 
  ${isRTL() &&
  css`
    transform: translateX(-25%) rotate(225deg);
  `} */
`;
