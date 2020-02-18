import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const StyledOfferWrapper = styled.div`
  width: 100%;
  background-color: #fff;
`;

export const StyledloaderWrapper = styled.div`
  min-height: 453px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledPageTitle = styled.h1`
  font-family: 'Geomanist';
  font-weight: 600;
  font-size: 25px;
  border-width: 0 0 1px;
  border-style: solid;
  border-color: ${colors.MediumGrey};
  padding: 20px 0 30px 0;
  text-align: center;
`;

export const StyledOfferCouponWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  min-height: 170px;
  width: 60%;

  ${media.smallest`
    width: 100%;
  `}
`;

export const StyledCoupon = styled.div`
  width: 50%;
  position: relative;
  ${media.small`
    width: 100%;
    margin-top: 20px;
  `}
`;

export const StyledOfferDetailsWrapper = styled.div`
  background-color: ${colors.LightGrey};
  padding: 20px;
  width: 88%;
  border-radius: 5px;
  ${props =>
    props.withoutImage &&
    css`
      width: 100%;
    `}
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

export const StyledOfferTitle = styled.h2`
  font-family: 'Geomanist';
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 15px;
`;
export const StyledOfferBody = styled.div`
  padding: 0 35px;
  ${media.small`
    padding: 0 10px;
  `}
`;
export const StyledOfferDetails = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const StyledOfferDescription = styled.div`
  font-family: 'Geomanist';
  font-weight: 300;
  color: ${colors.MainTextColor};
  font-size: 15px;
  width: 60%;
`;

export const StyledTrialDescription = styled.div`
  margin-bottom: 5px;
`;

export const StyledOfferDetailsPrice = styled.div`
  text-align: center;
`;

export const StyledTrial = styled.div`
  color: ${colors.MainTextColor};
  text-transform: uppercase;
  border: 1px ${colors.MainTextColor} solid;
  border-radius: 5px;
  padding: 5px;
  background-color: #fff;
  font-size: 13px;
  line-height: 13px;
  font-family: 'Geomanist';
  font-weight: 400;
  margin-bottom: 10px;
  display: inline-block;
`;

export const StyledTotalLabel = styled.div`
  display: inline-block;
`;

export const StyledOfferPrice = styled.h3`
  float: right;
  width: 18%;

  & span {
    font-size: 12px;
  }

  ${media.small`
    width: auto;
  `}
`;

export const StyledPrice = styled.div`
  font-family: 'Geomanist';
  font-weight: 400;
  font-size: 20px;

  & span {
    font-size: 12px;
  }
`;

export const StyledTotalWrapper = styled.div`
  background-color: ${colors.LightGrey};
  padding: 20px;
  border-width: 1px 0;
  border-style: solid;
  border-color: ${colors.MediumGrey};
  font-family: 'Geomanist';
  font-weight: 400;
`;

export const StyledPriceBeforeWrapper = styled.div`
  font-size: 16px;
  margin-bottom: 11px;
`;

export const StyledCouponDiscountWrapper = styled.div`
  font-size: 16px;
  color: ${colors.MainColor};
  font-family: 'Geomanist';
  font-weight: 300;
  margin-bottom: 14px;
`;

export const StyledPriceWrapper = styled.div`
  font-size: 20px;
`;

export const StyledOfferPayment = styled.div`
  height: 100%;
`;
