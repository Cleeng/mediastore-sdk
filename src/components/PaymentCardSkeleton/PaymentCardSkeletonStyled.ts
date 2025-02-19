import styled from 'styled-components';
import { FontColor } from 'styles/variables';
import { mediaFrom } from 'styles/BreakPoints';

export const CardStyled = styled.div.attrs(() => ({
  className: 'msd__payment-card'
}))``;

export const CardTypeStyled = styled.div.attrs(() => ({
  className: 'msd__payment-card__type'
}))`
  display: flex;
  width: 38px;
  height: 26px;

  svg {
    width: 100%;
    height: auto;
  }
`;

export const CardExpirationStyled = styled.div.attrs(() => ({
  className: 'msd__payment-data__wrapper'
}))`
  color: ${(props) => props.theme.fontColor || FontColor};
  font-size: 12px;

  display: flex;
`;

export const CardInfoStyled = styled.div.attrs(() => ({
  className: 'msd__payment-method__information'
}))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  ${mediaFrom.smallest`
    margin-bottom: 0;
  `}
`;

export const CardDetailsStyled = styled.div.attrs(() => ({
  className: 'msd__payment-method__details'
}))`
  margin-left: 20px;
  margin-right: auto;
`;

export const CardDetailsNameStyled = styled.div.attrs(() => ({
  className: 'msd__payment-method__name'
}))`
  color: ${(props) => props.theme.fontColor || FontColor};
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  margin-right: 4px;
`;

export const CardDetailsNameWrapStyled = styled.div.attrs(() => ({
  className: 'msd__payment-method__nameWrapper'
}))`
  display: flex;
  margin-bottom: 4px;
`;

export const CardInfoWrapStyled = styled.div.attrs(() => ({
  className: 'msd__payment-method__wrapper'
}))`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaFrom.smallest`
    flex-direction: row;
  `}
`;
