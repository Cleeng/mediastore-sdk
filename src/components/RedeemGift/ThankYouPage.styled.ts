import styled from 'styled-components';
import * as colors from 'styles/variables';

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

export const HeaderStyled = styled.h2`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  margin: 40px 0 24px 0;
  color: ${colors.FontColor};
`;
