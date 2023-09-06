import styled from 'styled-components';
import * as colors from 'styles/variables';

export const WrapperStyled = styled.div`
  position: relative;
  background: ${colors.BackgroundColor};
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
`;

export const RedeemGiftWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 34px 40px 92px 40px;
  align-items: center;
  width: 100%;
  position: relative;

  > button {
    max-width: 320px;
    align-self: center;
  }
`;

export const InputWrapperStyled = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 562px;

  .msd__account-input__wrapper {
    flex: 1;
  }

  .msd__error {
    color: ${colors.ErrorColor};
  }

  .msd__button {
    height: 33px;
    position: absolute;
    right: 0;
    top: 14px;
    right: 2px;
    max-width: 96px;
    border-radius: 4px;
    background-color: ${colors.FontColor};
  }
`;

export const OfferWrapperStyled = styled.div`
  width: 100%;
  max-width: 562px;
  background: ${colors.BackgroundColor};
  border: 1px solid ${colors.LineColor};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 33px;
`;
