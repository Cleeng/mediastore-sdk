import styled from 'styled-components';
import { media } from 'styles/BreakPoints';

export const ContentStyled = styled.div.attrs(() => ({
  className: 'msd__popup-content'
}))`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: auto;
  width: 80%;

  form {
    border: unset;
  }

  ${media.small`
      width: 90%;
    `}
`;

export const ButtonsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 376px;

  // check with other popups
  gap: 12px;
  margin-top: 24px;
  padding: 0 32px 0 32px;

  button {
    &:first-child {
      flex: 1;
    }

    &:last-child {
      flex: 2;
    }
  }
`;

export const ThankYouPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > button {
    max-width: 320px;
    margin-top: 112px;
  }
`;

export const ThankYouPageHeaderStyled = styled.h2`
  font-size: 25px;
  font-weight: 600;
  margin: 40px 0 24px 0;

  // this color? if yes find variable
  color: #515364;
`;

export const ThankYouPageInfoTextStyled = styled.p`
  font-size: 15px;
  font-weight: 300;
  text-align: center;
  max-width: 380px;

  // this color? if yes find variable
  color: #515364;
`;
