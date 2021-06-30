import styled, { css } from 'styled-components';
import {
  MyAccountBlue,
  White,
  MainColor,
  CardSecondaryColor,
  PaypalMainColor,
  PaypalSecondaryColor,
  IconsColor
} from 'styles/variables';

export const CardStyled = styled.div`
  position: relative;

  height: 0;
  padding-top: 56.25%;

  background-color: ${MyAccountBlue};
  border-radius: 20px;

  overflow: hidden;

  &:after {
    position: absolute;
    left: 30%;
    bottom: -10px;
    display: block;
    content: '';

    height: 400px;
    width: 400px;

    border-radius: 50%;
    background-color: ${CardSecondaryColor};
  }
`;

export const CardTypeStyled = styled.div`
  position: absolute;
  left: 16px;
  top: 28px;
  height: 24px;
  z-index: 2;

  svg {
    height: 100%;
    width: auto;
  }
`;

export const CardNumberStyled = styled.div`
  position: absolute;
  top: 28px;
  right: 16px;
  color: ${White};
  font-size: 13px;
  z-index: 2;
`;

export const CardExpirationStyled = styled.div`
  position: absolute;
  bottom: 18px;
  left: 16px;
  color: ${White};
  font-size: 12px;
  z-index: 2;
  display: flex;
  flex-direction: column;
`;

export const CardExpirationLabel = styled.div`
  color: ${IconsColor};
  font-size: 10px;
  margin-bottom: 4px;
  z-index: 2;
`;

export const CardExpirationDateStyled = styled.div`
  color: ${White};
  font-size: 13px;
  z-index: 2;
`;

export const CardEditStyled = styled.button`
  position: absolute;
  bottom: 18px;
  right: 16px;
  color: ${MainColor};
  z-index: 2;

  padding: 9px 17px;
  background-color: ${White};
  font-size: 11px;
  font-weight: 600;
  border-radius: 17px;
  border: 0;
  box-shadow: 0px 3px 50px #00000014;

  &:hover {
    cursor: pointer;
  }
`;

export const CardWrapStyled = styled.div`
  max-width: 298px;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;

  ${props =>
    props.type === 'paypal' &&
    css`
      ${CardStyled} {
        background-color: ${PaypalMainColor};

        &:after {
          background-color: ${PaypalSecondaryColor};
        }
      }
    `}
`;
