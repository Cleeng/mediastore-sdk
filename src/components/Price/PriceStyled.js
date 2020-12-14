import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import {
  MainColor,
  BigFont,
  LargeFont,
  MediumFontWeight,
  TinyFont
} from 'styles/variables';

export const WrapperStyled = styled.h3`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;

  align-items: center;

  color: ${MainColor};

  ${mediaFrom.small`
    flex-wrap: nowrap;
  `}
`;
export const CurrencyStyled = styled.span`
  margin-right: 2px;

  font-size: ${TinyFont};
  font-weight: ${MediumFontWeight};

  ${mediaFrom.small`
    font-size: ${BigFont};
  `}
`;
export const PriceStyled = styled.span`
  font-size: ${BigFont};

  font-weight: ${MediumFontWeight};

  ${mediaFrom.small`
    font-size: ${LargeFont};
  `}
`;

export const PeriodStyled = styled.span`
  margin: auto 0 0 5px;

  font-size: ${TinyFont};
`;

export const InnerWrapper = styled.div`
  line-height: 1rem;
`;
