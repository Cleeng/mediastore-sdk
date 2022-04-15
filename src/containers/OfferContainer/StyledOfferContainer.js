import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const StyledLoaderContainer = styled.div`
  * {
    box-sizing: border-box;
  }
  position: relative;
`;

export const StyledLoaderContent = styled.div`
  position: relative;

  width: 100%;
  margin: 0 auto;
  padding: 80px 120px 120px;

  background-color: ${colors.BackgroundColor};

  text-align: center;

  ${media.small`
    width: 80%;
  `}
`;
