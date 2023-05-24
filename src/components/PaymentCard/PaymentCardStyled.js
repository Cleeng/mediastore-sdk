import styled from 'styled-components';
import { White, FontColor } from 'styles/variables';
import { mediaFrom } from 'styles/BreakPoints';
import Button from 'components/Button';

export const CardStyled = styled.div.attrs(() => ({
  className: 'msd__payment-card'
}))`
  height: 100%;
`;

export const CardTypeStyled = styled.figure.attrs(() => ({
  className: 'msd__payment-card__type'
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 26px;
  margin: 0;

  svg {
    height: auto;
  }
`;

export const CardNumberStyled = styled.div.attrs(() => ({
  className: 'msd__payment-card__number'
}))`
  color: ${FontColor};
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
`;

export const HolderNameStyled = styled.div.attrs(() => ({
  className: 'msd__payment-holder__name'
}))`
  color: ${FontColor};
  font-size: 13px;
  font-weight: 300;
`;

export const CardExpirationStyled = styled.div.attrs(() => ({
  className: 'msd__payment-data__wrapper'
}))`
  color: ${FontColor};
  font-size: 12px;

  display: flex;
`;

export const CardExpirationLabel = styled.div.attrs(() => ({
  className: 'msd__payment-data__label'
}))`
  color: ${FontColor};
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 4px;
  margin-right: 4px;
`;

export const CardExpirationDateStyled = styled.time.attrs(() => ({
  className: 'msd__payment-data__value'
}))`
  color: ${FontColor};
  font-size: 13px;
  font-weight: 300;

  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const CardEditStyled = styled(Button).attrs(() => ({
  className: 'msd__payment-method__button'
}))`
  color: ${White};

  padding: 11px 25px;
  background-color: ${FontColor};
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  border-radius: 21px;
  border: 0;
  opacity: 0.9;

  &:hover,
  &:focus {
    cursor: pointer;
    opacity: 1;
  }
`;

export const CardInfoStyled = styled.div.attrs(() => ({
  className: 'msd__payment-method__information'
}))`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  ${mediaFrom.medium`
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
  color: ${FontColor};
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
  height: 100%;

  ${mediaFrom.medium`
    flex-direction: row;
    align-items: center;
  `};
`;
