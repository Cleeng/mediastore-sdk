import styled from 'styled-components';
import { TinyFont, LightFont, FontColor } from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const DetailsWrapper = styled.div`
  margin: 9px 0;
`;

export const DetailsStyled = styled.div.attrs(() => ({
  className: 'msd__checkout-card-details__description'
}))`
  white-space: pre-line;
  margin: 6px 0;
`;

export const IconStyled = styled.span.attrs(() => ({
  className: 'msd__checkout-card-details__icon'
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  ${media.smallest`
          display: none;
  `}
`;

export const LineWrapperStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const DescriptionWrapperStyled = styled.div``;

export const DescriptionStyled = styled.p`
  font-size: ${TinyFont};
  font-weight: ${LightFont};
  line-height: 17px;
  white-space: pre-line;
  color: ${(props) => props.theme.fontColor || FontColor};
`;
