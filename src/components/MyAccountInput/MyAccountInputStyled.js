import styled, { css } from 'styled-components';
import { isRTL } from 'styles/RTLHelper';
import {
  FontColor,
  BackgroundColor,
  LineColor,
  ErrorColor
} from 'styles/variables';

export const WrapStyled = styled.div.attrs(() => ({
  className: 'msd__account-input__wrapper'
}))`
  position: relative;
  margin-bottom: 12px;

  ${(props) =>
    props.$hideInput &&
    css`
      display: none;
    `};

  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `};

  .msd__error {
    color: ${(props) => props.theme.errorColor || ErrorColor};
  }

  input[type='date'] {
    text-transform: uppercase;

    &::-webkit-calendar-picker-indicator {
      font-size: 20px;
      opacity: 0.7;
    }
  }
`;

export const InputElementLabelStyled = styled.label.attrs(() => ({
  className: 'msd__account-input__label'
}))`
  display: block;
  margin-bottom: 12px;
  color: ${(props) => props.theme.fontColor || FontColor};
  font-size: 13px;
`;

export const InputElementStyled = styled.input.attrs(() => ({
  className: 'msd__account-input'
}))`
  width: 100%;
  padding: 10px 16px;

  border: 1px solid ${LineColor};
  border-radius: 4px;
  font-size: 13px;
  line-height: 13px;

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

  ${(props) =>
    props.$error &&
    css`
      border: 1px solid ${props.theme.errorColor || ErrorColor};
    `}
`;
