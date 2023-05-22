import styled, { css } from 'styled-components';
import { MyAccountTextGray } from 'styles/variables';

export const WrapStyled = styled.article`
  position: relative;

  margin-bottom: 30px;
`;

export const CardsWrapper = styled.div.attrs(() => ({
  className: 'msd__payment-method__wrapper'
}))`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  @media only screen and (max-width: 1550px) {
    grid-template-columns: 1fr;
    > div {
      justify-self: center;
    }
  }
  ${props =>
    props.numberOfItems === 1 &&
    css`
      grid-template-columns: 1fr;
      > div {
        justify-self: center;
      }
    `}
`;

export const Message = styled.div.attrs(() => ({
  className: 'msd__payment-method__message'
}))`
  margin-bottom: 24px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: ${MyAccountTextGray};
  align-self: center;
`;
