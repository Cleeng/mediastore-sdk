import styled from 'styled-components';
import { White, FontColor } from 'styles/variables';
import { mediaFrom } from 'styles/BreakPoints';

export const CardStyled = styled.div.attrs(() => ({
  className: 'msd__payment-card'
}))``;

export const CardTypeStyled = styled.div.attrs(() => ({
  className: 'msd__payment-card__type'
}))`
  display: flex;
  width: 38px;

  svg {
    width: 100%;
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
  z-index: 2;
`;

export const CardExpirationStyled = styled.div.attrs(() => ({
  className: 'msd__payment-data__wrapper'
}))`
  color: ${FontColor};
  font-size: 12px;
  z-index: 2;
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
  z-index: 2;
`;

export const CardExpirationDateStyled = styled.div.attrs(() => ({
  className: 'msd__payment-data__value'
}))`
  color: ${FontColor};
  font-size: 13px;
  font-weight: 300;
  z-index: 2;
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const CardEditStyled = styled.button.attrs(() => ({
  className: 'msd__payment-method__button'
}))`
  color: ${White};
  z-index: 2;

  padding: 11px 25px;
  background-color: ${FontColor};
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  border-radius: 17px;
  border: 0;
  box-shadow: 0px 3px 50px #00000014;

  &:hover {
    cursor: pointer;
  }
`;

export const CardHeaderStyled = styled.h3`
  color: ${FontColor};
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0;
  margin-bottom: 12px;
`;

export const CardInfoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  ${mediaFrom.smallest`
    margin-bottom: 0;
  `}
`;

export const CardDetailsStyled = styled.div`
  margin-left: 20px;
  margin-right: auto;
`;

export const CardDetailsNameStyled = styled.div`
  color: ${FontColor};
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  margin-right: 4px;
`;

export const CardDetailsNameWrapStyled = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

export const CardInfoWrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaFrom.smallest`
    flex-direction: row;
  `}
`;
