import styled from 'styled-components';
import { media } from 'styles/BreakPoints';
import { FontColor, BackgroundColor } from 'styles/variables';

export const WrapStyled = styled.article.attrs(() => ({
  className: 'msd__payment-details__wrapper'
}))`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  background: ${BackgroundColor};

  ${media.small`
    padding: 0;
  `}
`;

export const HeaderStyled = styled.div`
  color: ${FontColor};

  font-size: 14px;
  font-weight: 700;
`;
