import styled from 'styled-components';
import * as variables from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const StyledLabel = styled.span.attrs(() => ({
  className: 'msd__price-summary__label'
}))`
  font-size: 16px;
  color: ${variables.FontColor};
`;

// refactor from h3 to span
export const StyledOfferPrice = styled.span.attrs(() => ({
  className: 'msd__price-summary__ammount'
}))`
  float: right;
  font-size: 16px;
  font-weight: bold;
  color: ${variables.FontColor};
  margin: 16px 0;

  & span {
    font-size: 12px;
  }

  ${media.small`
    width: auto;
  `}
`;

export const StyledTotalLabel = styled(StyledLabel).attrs(() => ({
  className: 'msd__price-summary__total--label'
}))`
  font-weight: ${variables.BoldFont};
  text-transform: uppercase;
`;

export const StyledTotalOfferPrice = styled(StyledOfferPrice).attrs(() => ({
  className: 'msd__price-summary__total--ammount'
}))`
  font-size: 25px;
  font-weight: ${variables.MediumFontWeight};
`;

export const StyledPriceBox = styled.ul.attrs(() => ({
  className: 'msd__price-summary'
}))`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px 0;
`;

export const StyledPriceBoxWrapper = styled.div`
  width: 400px;

  ${media.small`
    width: 100%;
  `}
`;

export const StyledPriceWrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  & strong {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;
