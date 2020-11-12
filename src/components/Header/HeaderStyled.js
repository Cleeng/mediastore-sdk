import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';

export const HeaderStyled = styled.header`
  display: flex;
  position: relative;

  padding: 0;

  background-color: ${colors.BackgroundColor};
  border-bottom: 1px ${colors.LineColor} solid;

  text-align: center;

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
  background-size: auto 35%;
  background-position: center;
  background-repeat: no-repeat;
`;
