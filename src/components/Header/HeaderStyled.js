import styled, { css } from 'styled-components';
import { media } from 'styles/BreakPoints';
import * as colors from 'styles/variables';

export const HeaderStyled = styled.header`
  display: flex;
  position: relative;

  padding: 0;

  background-color: ${colors.BackgroundColor};
  border-bottom: 1px ${colors.LineColor} solid;

  text-align: center;

  ${media.small`
    margin: 0 10px;
  `}

  ${props =>
    props.switchOff &&
    css`
      display: none;
    `}
`;

export const LogoStyled = styled.div`
  height: 80px;
  width: 100%;

  background-image: ${props => props.logoSrc && css`url(${props.logoSrc})`};
  background-size: 100% 40%;
  background-position: center;
  background-repeat: no-repeat;
`;
