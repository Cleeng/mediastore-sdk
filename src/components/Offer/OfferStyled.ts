import styled from 'styled-components';
import * as variables from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const StyledOfferWrapper = styled.div`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  position: relative;
  width: 100%;
  background: ${(props) =>
    props.theme.backgroundColor || variables.BackgroundColor};
`;

export const StyledOfferCouponWrapper = styled.div`
  margin: 16px 0;
`;

export const StyledOfferDetailsAndCoupon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 12px;
`;

export const StyledOfferBody = styled.section.attrs(() => ({
  className: 'msd__checkout-wrapper'
}))`
  padding: 25px 35px;
  border-bottom: 1px solid ${variables.LineColor};

  ${media.small`
    padding: 0 10px;
  `};
`;

export const OfferCardWrapperStyled = styled.article.attrs(() => ({
  className: 'msd__offer-card'
}))`
  width: 100%;
  background: ${(props) =>
    props.theme.backgroundColor || variables.BackgroundColor};
  border: 1px solid ${variables.LineColor};
  border-radius: 12px;

  padding: 20px;
`;
