import styled from 'styled-components';
import * as variables from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const StyledLabel = styled.div`
  font-size: 16px;
  color: ${variables.MainColor};
`;

export const StyledOfferPrice = styled.h3`
  float: right;
  font-size: 16px;
  color: ${variables.MainColor};

  & span {
    font-size: 12px;
  }

  ${media.small`
    width: auto;
  `}
`;
export const StyledTotalLabel = styled(StyledLabel)`
  font-weight: ${variables.BoldFont};
  text-transform: uppercase;
`;

export const StyledTotalOfferPrice = styled(StyledOfferPrice)`
  font-size: 25px;
  font-weight: ${variables.MediumFontWeight};
`;

export const StyledPriceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 16px 0;
`;

export const StyledPriceBoxWrapper = styled.div`
  width: 400px;

  ${media.small`
    width: 100%;
  `}
`;

export const StyledPriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
