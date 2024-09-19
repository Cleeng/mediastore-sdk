import styled from 'styled-components';
import * as variables from 'styles/variables';
import { media } from 'styles/BreakPoints';
import { PropsWithChildren } from 'react';

export const StyledLabel = styled.span.attrs(() => ({
  className: 'msd__price-summary__label'
}))<PropsWithChildren>`
  font-size: 16px;
  color: ${(props) => props.theme.fontColor || variables.FontColor};
`;

export const StyledOfferPrice = styled.span.attrs(() => ({
  className: 'msd__price-summary__ammount'
}))<PropsWithChildren>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.fontColor || variables.FontColor};
  margin: 16px 0;

  & span {
    font-size: 12px;
  }

  ${media.small`
    width: auto;
  `}
`;

export const StyledTotalWrapper = styled.strong`
  border-top: 1px solid ${variables.LineColor};
`;

export const StyledTotalLabel: typeof StyledLabel = styled(StyledLabel).attrs(
  () => ({
    className: 'msd__price-summary__total--label'
  })
)<PropsWithChildren>`
  font-weight: ${variables.BoldFont};
  text-transform: uppercase;
`;

export const StyledTotalOfferPrice: typeof StyledOfferPrice = styled(
  StyledOfferPrice
).attrs(() => ({
  className: 'msd__price-summary__total--ammount'
}))`
  font-size: 25px;
  font-weight: ${variables.MediumFontWeight};
`;

export const StyledPriceBox = styled.ul.attrs(() => ({
  className: 'msd__price-summary'
}))`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px 0;
`;

export const StyledPriceBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

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
  position: relative;

  &:last-of-type {
    margin-bottom: unset;
  }

  strong {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

export const CouponNoteOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CouponNoteInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CouponNoteStyled = styled.div.attrs(() => ({
  className: 'msd__price-coupon__note'
}))`
  color: ${(props) => props.theme.successColor || variables.ConfirmColor};
  border-radius: 5px;

  font-size: 12px;
`;

export const StyledRedeemButton = styled.div`
  > span {
    font-size: 13px;
    color: ${(props) => props.theme.fontColor || variables.FontColor};
    font-weight: 400;
  }

  > button {
    color: ${(props) => props.theme.successColor || variables.ConfirmColor};
    text-decoration: underline;
  }
`;

export const RemoveCouponButton = styled.button.attrs(() => ({
  className: 'msd__price-coupon__remove-button'
}))`
  border: none;
  background-color: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: ${variables.BigFont};
  font-weight: ${variables.MediumFontWeight};
  color: ${(props) => props.theme.fontColor || variables.FontColor};

  &:hover {
    color: ${(props) => props.theme.primaryColor || variables.PrimaryColor};
  }
`;
