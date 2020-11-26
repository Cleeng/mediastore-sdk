import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import {
  BoldFont,
  MediumFont,
  MediumFontWeight,
  TinyFont,
  SmallFont,
  MicroFont,
  MainColor,
  White,
  LineColor
} from 'styles/variables';

export const WrapperStyled = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
`;
export const InnerWrapper = styled.div`
  color: ${MainColor};
  margin-right: 15px;

  ${mediaFrom.small`
    margin-right: 20px;
  `}
`;

export const TitleStyled = styled.h1`
  margin: 0 auto 3px 0;

  font-weight: ${BoldFont};
  font-size: ${SmallFont};
  line-height: 15px;

  ${mediaFrom.small`
    font-size: ${MediumFont};
    line-height: 19px;
  `};
`;
export const DescriptionStyled = styled.h2`
  font-size: ${TinyFont};
  font-weight: ${MediumFontWeight};
  line-height: 17px;
`;

export const PriceWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0 auto auto;
`;

export const TrialBadgeStyled = styled.div`
  width: 80px;
  padding: 4px 8px;
  margin-bottom: 4px;
  background-color: ${White};
  color: ${MainColor};
  border: 1px solid ${LineColor};
  border-radius: 10px;
  font-size: 9px;
  font-size: ${MicroFont};
  font-weight: ${MediumFontWeight};
  text-transform: uppercase;
`;
