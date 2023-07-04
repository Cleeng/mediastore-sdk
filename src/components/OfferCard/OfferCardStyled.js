import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import {
  BoldFont,
  MediumFont,
  MediumFontWeight,
  TinyFont,
  SmallFont,
  MicroFont,
  FontColor,
  White,
  LineColor,
  BackgroundColor,
  ConfirmColor
} from 'styles/variables';

export const WrapperStyled = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
`;

export const InnerWrapper = styled.div.attrs(() => ({
  className: 'msd__subscription-text__wrapper'
}))`
  max-width: 50%;
  color: ${FontColor};
  margin-inline-end: 15px;

  ${mediaFrom.small`
    max-width: none;
    margin-inline-end: 20px;
  `}
`;

export const TitleStyled = styled.h2.attrs(() => ({
  className: 'msd__subscription-text__title'
}))`
  margin: 0 auto 3px 0;

  font-weight: ${BoldFont};
  font-size: ${SmallFont};
  line-height: 15px;

  ${mediaFrom.small`
    font-size: ${MediumFont};
    line-height: 19px;
  `};
`;
export const DescriptionStyled = styled.p.attrs(() => ({
  className: 'msd__subscription-text__description'
}))`
  font-size: ${TinyFont};
  font-weight: ${MediumFontWeight};
  line-height: 17px;
  margin: 9px 0;
`;

export const PriceWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__subscription-price__wrapper'
}))`
  display: flex;
  flex-direction: column;
  margin-inline: auto 0;
`;

export const TrialBadgeStyled = styled.div.attrs(() => ({
  className: 'msd__subscription-price__badge'
}))`
  width: 80px;
  padding: 4px 8px;
  margin-bottom: 4px;
  background-color: ${White};
  color: ${FontColor};
  border: 1px solid ${LineColor};
  border-radius: 10px;
  font-size: 9px;
  font-size: ${MicroFont};
  font-weight: ${MediumFontWeight};
  text-transform: uppercase;
`;
export const SubBoxStyled = styled.div.attrs(() => ({
  className: 'msd__subscription-subcard'
}))`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  margin: 15px 0;
  padding: 12px;
  border: 1px solid ${LineColor};
  background: ${BackgroundColor};
  border-radius: 4px;
  svg {
    min-width: 18px;
    width: 18px;
  }
`;

export const BoxTextStyled = styled.p.attrs(() => ({
  className: 'msd__subscription-subcard__title'
}))`
  font-size: ${TinyFont};
  color: ${FontColor};
  margin-inline: 10px 0;
  line-height: initial;
`;

export const SubBoxContentStyled = styled.div``;

export const SubBoxButtonStyled = styled.button`
  padding: 0;
  margin: 8px 0 0 10px;
  background-color: transparent;
  color: ${ConfirmColor};
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;
