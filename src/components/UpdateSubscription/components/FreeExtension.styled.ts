import styled from 'styled-components';
import { BackgroundColor, FontColor } from 'styles/variables';

export const FreeExtensionWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .msd__popup-content__buttons {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    > button {
      max-width: 222px;
      width: 100%;

      &:last-child {
        font-weight: 300;
        color: ${FontColor};
        opacity: 0.8;
        text-decoration: underline;
      }
    }
  }
`;

export const TextWrapperStyled = styled.div`
  max-width: 302px;
`;

export const AcceptButtonWrapperStyled = styled.div`
  display: flex;
  justify-content: center;

  > button {
    max-width: 200px;
  }
`;

export const FreeExtensionCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 16px;

  width: 248px;
  height: 224px;
  margin-top: 8px;
  margin-bottom: 52px;

  border: 1px solid #d8ddea;
  border-radius: 6px;
  background-color: ${BackgroundColor};

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  p {
    margin: 0;
  }
`;

export const FreeExtensionCardPeriodStyled = styled.p`
  font-size: 30px;
  font-weight: 600;
`;
