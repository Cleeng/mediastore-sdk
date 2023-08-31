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

export const HeaderStyled = styled.h2`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  margin: 40px 0 24px 0;
  color: ${colors.FontColor};
`;

export const ThankYouPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0 80px 0;

  > button {
    max-width: 320px;
    margin-top: 96px;
  }
`;

export const InfoTextStyled = styled.div`
  font-size: 15px;
  font-weight: 300;
  text-align: center;
  max-width: 380px;
  color: ${colors.FontColor};
  width: 100%;

  p {
    font-weight: 400;
    text-align: center;
  }
`;
