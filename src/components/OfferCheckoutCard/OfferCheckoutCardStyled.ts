import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import {
  BoldFont,
  MediumFont,
  SemiBoldFont,
  TinyFont,
  SmallFont,
  MicroFont,
  FontColor,
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
export const InnerWrapper = styled.div.attrs(() => ({
  className: 'msd__checkout-card-text__wrapper'
}))`
  max-width: 50%;
  color: ${(props) => props.theme.fontColor || FontColor};
  margin-right: 15px;

  ${mediaFrom.small`
    max-width: none;
    margin-right: 20px;
  `}
`;

export const TitleStyled = styled.h2.attrs(() => ({
  className: 'msd__checkout-card-text__title'
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
export const PublisherDescriptionStyled = styled.p.attrs(() => ({
  className: 'msd__checkout-card-text__description'
}))`
  font-size: ${TinyFont};
  font-weight: ${SemiBoldFont};
  line-height: 17px;
  white-space: pre-line;
  margin: 9px 0;
`;

export const PriceWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__checkout-card-price__wrapper'
}))`
  display: flex;
  flex-direction: column;
  margin-inline: auto 0;
  margin-block: auto;
`;

export const TrialBadgeStyled = styled.div.attrs(() => ({
  className: 'msd__checkout-card-price__badge'
}))`
  max-width: 120px;
  padding: 4px 8px;
  margin-bottom: 12px;
  background-color: ${White};
  color: ${(props) => props.theme.fontColor || FontColor};
  border: 1px solid ${LineColor};
  border-radius: 10px;
  font-size: 9px;
  font-size: ${MicroFont};
  font-weight: ${SemiBoldFont};
  text-transform: uppercase;
  text-align: center;
`;
