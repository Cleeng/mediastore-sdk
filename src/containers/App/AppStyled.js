import styled, { css } from 'styled-components';
import { media } from 'styles/BreakPoints';

export const AppStyled = styled.div`
  min-height: 100vh;
  padding: 40px 0;

  background: #eaeff8;

  ${media.small`
    padding: 0;
  `}

  ${props =>
    props.hosted &&
    css`
      width: 100%;
      padding: 0;
    `}
`;

export const AppContentStyled = styled.div`
  position: relative;

  height: 100%;
  margin: auto;
  max-width: 900px;

  background: white;
  box-shadow: 0px 0px 79px #00000024;

  ${media.small`
    min-height: 100vh;
    width: 100%;
  `}

  ${props =>
    props.hosted &&
    css`
      max-width: unset;
      min-height: 100vh;
    `}
`;
