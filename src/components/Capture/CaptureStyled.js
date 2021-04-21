import styled from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const CaptureStyled = styled.div``;

export const CaptureContentStyled = styled.div`
  position: relative;

  width: 55%;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 70px;

  text-align: center;

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

  color: ${colors.MainColor};
`;
