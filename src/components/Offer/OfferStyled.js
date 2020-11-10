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

export const StyledOfferBody = styled.div`
  padding: 0 35px;
  ${media.small`
    padding: 0 10px;
  `}
`;

export const SubscriptionCardWrapperStyled = styled.section`
  width: 100%;
  background: ${variables.BackgroundColor};
  border: 1px solid ${variables.LineColor};
  border-radius: 12px;

  padding: 20px;
`;
