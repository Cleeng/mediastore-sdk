import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import {
  FontColor,
  BigFont,
  LargeFont,
  MediumFontWeight,
  TinyFont
} from 'styles/variables';

export const WrapperStyled = styled.h3.attrs(() => ({
  className: 'msd__subscription-price'
}))`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;

  align-items: center;

  color: ${FontColor};

  ${mediaFrom.small`
    flex-wrap: nowrap;
  `}
`;
export const CurrencyStyled = styled.span.attrs(() => ({
  className: 'msd__subscription-price__currency'
}))`
  margin-right: 2px;

  font-size: ${TinyFont};
  font-weight: ${MediumFontWeight};

  ${mediaFrom.small`
    font-size: ${BigFont};
  `}
`;
export const PriceStyled = styled.span.attrs(() => ({
  className: 'msd__subscription-price__amount'
}))`
  font-size: ${BigFont};

  font-weight: ${MediumFontWeight};

  ${mediaFrom.small`
    font-size: ${LargeFont};
  `}
`;

export const PeriodStyled = styled.span.attrs(() => ({
  className: 'msd__subscription-price__period'
}))`
  margin: auto 0 0 5px;

  font-size: ${TinyFont};
`;

export const InnerWrapper = styled.div`
  line-height: 1rem;
`;
