import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const CaptureStyled = styled.div.attrs(() => ({
  className: 'msd__capture'
}))`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  position: relative;
`;

export const CaptureContentStyled = styled.div`
  position: relative;

  width: 100%;
  margin: 0 auto;
  padding: 80px 120px 120px;

  background-color: ${colors.BackgroundColor};

  text-align: center;

  ${media.medium`
    padding-inline: 5%;
  `}

  ${media.small`
    width: 80%;
  `}
`;

export const CaptureTitle = styled.div`
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;

  color: ${colors.FontColor};
`;
