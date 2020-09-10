import styled from 'styled-components';
import * as variables from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const StyledOfferWrapper = styled.div`
  width: 100%;
  background-color: #fff;
`;

export const StyledOfferCouponWrapper = styled.div`
  margin: 16px 0;
`;

export const StyledOfferDetailsAndCoupon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const StyledImageUrl = styled.img`
  width: auto;
  height: auto;
  max-height: 300px;
  ${media.small`
    display: none;
  `}
`;

export const StyledOfferBody = styled.div`
  padding: 20px 35px 0;
  ${media.small`
    padding: 20px 10px 0;
  `}
`;

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
  width: 300px;

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

export const SubscriptionCardWrapperStyled = styled.section`
  width: 100%;
  background: ${variables.BackgroundColor};
  border: 1px solid ${variables.LineColor};
  border-radius: 12px;

  padding: 20px;
`;
