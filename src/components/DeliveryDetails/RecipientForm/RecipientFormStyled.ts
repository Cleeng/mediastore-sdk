import styled, { css } from 'styled-components';
import { isRTL } from 'styles/RTLHelper';
import { FontColor, BackgroundColor, LineColor } from 'styles/variables';

// attrs with classNames needed?

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
  padding: 24px 18px;

  > div {
    margin-bottom: 2px;
  }

  .msd__error {
    color: #cb4477;
  }
`;

export const InfoText = styled.p`
  font-size: 13px;
  font-weight: 300;
  font-style: italic;
  color: #515364;
  opacity: 0.7;
`;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledLabel = styled.label`
  color: ${FontColor};
  font-size: 13px;
`;

export const StyledMessage = styled.textarea`
  width: 100%;
  padding: 10px 16px;
  min-height: 92px;
  border: 1px solid ${LineColor};
  border-radius: 4px;
  font-size: 13px;
  line-height: 13px;
  resize: none;
  margin-top: 24px;

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
