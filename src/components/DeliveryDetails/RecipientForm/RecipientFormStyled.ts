import styled, { css } from 'styled-components';
import { isRTL } from 'styles/RTLHelper';
import { FontColor, BackgroundColor, LineColor } from 'styles/variables';

export const StyledRecipientForm = styled.form.attrs(() => ({
  className: 'msd__recipientForm'
}))`
  display: flex;
  flex-direction: column;
  max-width: 376px;
  background-color: white;
  border: 1px solid ${LineColor};
  border-radius: 12px;
  width: 100%;
  max-width: 376px;
  align-self: center;
  margin-top: 18px;
  padding: 24px 16px;

  .msd__account-input__wrapper {
    margin-bottom: 2px;

    .msd__account-input__label {
      margin-bottom: 5px;
    }

    .msd__account-input {
      font-family: inherit;
      font-size: 16px;
      padding: 5px 8px;
      height: 40px;

      &[value=''] {
        color: rgb(112, 112, 112);
        font-weight: 300;
      }
    }

    .msd__error {
      color: #cb4477;
    }
  }
`;

export const InfoText = styled.p`
  font-size: 13px;
  font-weight: 300;
  font-style: italic;
  color: ${(props) => props.theme.fontColor || FontColor};

  opacity: 0.7;
  margin-top: 12px;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledLabel = styled.label`
  color: ${(props) => props.theme.fontColor || FontColor};
  font-size: 13px;
`;

export const StyledMessage = styled.textarea`
  width: 100%;
  padding: 10px 8px;
  min-height: 92px;
  border: 1px solid ${LineColor};
  border-radius: 4px;
  font-family: inherit;
  font-size: 16px;
  line-height: 20px;
  resize: none;

  ${isRTL() &&
  css`
    text-align: right;
  `}

  &:focus,
  &:active {
    border: 1px solid ${LineColor};
  }

  &:disabled {
    background-color: ${(props) =>
      props.theme.backgroundColor || BackgroundColor};
    color: ${(props) => props.theme.fontColor || FontColor};
  }

  &::placeholder {
    color: rgb(112, 112, 112);
    font-weight: 300;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
