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
  margin: auto 0 auto 5px;

  font-size: ${TinyFont};
`;

export const InnerWrapper = styled.div`
  line-height: 1rem;
`;

export const AdditionalLabelStyled = styled.p.attrs(() => ({
  className: 'msd__subscription-price__additional-label'
}))`
  font-size: 10px;
  line-height: 10px;
  text-align: right;
  color: inherit;
  margin-top: 2px;
`;
