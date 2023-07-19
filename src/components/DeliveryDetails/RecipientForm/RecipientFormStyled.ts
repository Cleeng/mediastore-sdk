import MyAccountInput from 'components/MyAccountInput';
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

  > div {
    margin-bottom: 2px;
  }

  .msd__error {
    color: #cb4477;
  }

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
`;

export const InfoText = styled.p`
  font-size: 13px;
  font-weight: 300;
  font-style: italic;
  color: #515364;
  opacity: 0.7;
  margin-top: 12px;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledLabel = styled.label`
  color: ${FontColor};
  font-size: 13px;
`;

export const StyledMessage = styled.textarea`
  width: 100%;
  padding: 5px 8px;
  min-height: 92px;
  border: 1px solid ${LineColor};
  border-radius: 4px;
  font-family: inherit;
  font-size: 16px;
  line-height: 16px;
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
    background-color: ${BackgroundColor};
    color: ${FontColor};
  }
`;
