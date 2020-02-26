import styled from 'styled-components';
import { media } from './styles/BreakPoints';

export const AppStyled = styled.div`
  min-height: 100vh;
  padding: 40px 0;

  background: linear-gradient(-21deg, #44b2e7, #595fbb);

  ${media.small`
    padding: 0;
  `}
`;

export const AppContentStyled = styled.div`
  position: relative;

  margin: auto;
  max-width: 900px;

  background: white;

  ${media.small`
    min-height: 100vh;
    height: 1px;
    width: 100%;
  `}
`;
