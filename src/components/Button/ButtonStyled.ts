import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';
import { ButtonStyledProps } from './Button.types';

const ButtonStyled = styled.button.attrs((props: ButtonStyledProps) => ({
  className: `msd__button ${
    props.$variant ? `msd__button--${props.$variant}` : ''
  }`
}))`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-width: min-content;

  border-radius: 30px;
  outline: 0;
  border: none;

  text-align: center;
  text-decoration: none;
  letter-spacing: 0.025em;
  font-size: 13px;
  padding: 12px 25px;
  font-weight: 600;
  line-height: initial;

  transition: opacity 0.1s ease-in-out;
  cursor: pointer;

  &:active {
    outline: none;
  }

  &:focus {
    outline: 1px solid ${colors.FocusColor};
  }

  &:disabled {
    &:hover {
      cursor: not-allowed;
    }
  }

  ${(props: ButtonStyledProps) =>
    props.$size === 'big' &&
    css`
      padding: 20px;
      font-size: 16px;
      font-weight: 400;
    `}

  ${(props) =>
    props.$size === 'normal' &&
    css`
      padding: 12px 25px;
      font-size: 13px;
      font-weight: 600;
    `}

  ${(props) =>
    (props.$variant === 'confirm' &&
      css`
        color: ${colors.White};
        background-color: ${props.theme.successColor || colors.ConfirmColor};
        opacity: 0.9;
        &:hover,
        &:focus {
          cursor: pointer;
          opacity: 1;
        }
      `) ||
    (props.$variant === 'primary' &&
      css`
        color: ${colors.White};
        background-color: ${props.theme.primaryColor || colors.PrimaryColor};
        opacity: 0.9;
        &:hover,
        &:focus {
          cursor: pointer;
          opacity: 1;
        }
      `) ||
    (props.$variant === 'paypal' &&
      css`
        color: ${colors.White};
        background-color: ${colors.PayPal};
        opacity: 0.9;
        &:hover,
        &:focus {
          cursor: pointer;
          opacity: 1;
        }
      `) ||
    (props.$variant === 'danger' &&
      css`
        color: ${colors.White};
        background-color: ${props.theme.errorColor || colors.ErrorColor};
        opacity: 0.9;
        &:hover,
        &:focus {
          cursor: pointer;
          opacity: 1;
        }
      `) ||
    (props.$variant === 'payment' &&
      css`
        height: 48px;
        width: 30%;
        min-width: max-content;

        padding: 15px;
        border-radius: 6px;

        color: ${colors.White};
        background-color: ${colors.PaymentButtonBgn};

        font-size: 14px;

        ${media.small`
          width: 100%;
        `}

        &:hover,
        &:focus {
          cursor: pointer;
          opacity: 0.9;
        }
      `) ||
    (props.$variant === 'secondary' &&
      css`
        background-color: ${props.theme.secondaryColor ||
        colors.SecondaryColor};
        border: 1px solid
          ${props.theme.backgroundColor || colors.BackgroundColor};
        color: ${props.theme.fontColor || colors.FontColor};
        &:hover,
        &:focus,
        &:active {
          cursor: pointer;
          background-color: ${colors.LineColor};
          border: 1px solid ${colors.LineColor};
        }
      `) ||
    (props.$variant === 'simple' &&
      css`
        background-color: transparent;
        border: 1px solid ${colors.LineColor};
        color: ${props.theme.fontColor || colors.FontColor};
        &:not(:disabled):hover,
        &:focus {
          cursor: pointer;
          background-color: ${colors.BackgroundColor};
        }
        &:active {
          border: 1px solid ${colors.LineColor};
        }
      `) ||
    (props.$variant === 'navLink' &&
      css`
        position: absolute;
        top: 50%;
        left: 35px;

        height: auto;
        width: auto;
        border-radius: none;
        padding: 0;

        transform: translateY(-45%);
        background-color: transparent;
        color: ${props.theme.fontColor || colors.FontColor};
        font-size: 16px;
        letter-spacing: 0.025em;
        font-weight: 500;

        &::before {
          content: '<';
          margin-right: 10px;
        }
        &:hover,
        &:focus {
          font-weight: 700;
          text-decoration: none;
        }
        ${media.small`
          top: 15px;
          left: 10px;
        `}
      `) ||
    (props.$variant === 'link' &&
      css`
        display: inline-block;

        width: auto;
        height: auto;
        padding: 0px;

        border-radius: none;
        background-color: transparent;
        color: ${props.theme.fontColor || colors.FontColor};

        text-decoration: underline;
        letter-spacing: 0.025em;
        font-weight: 300;
        font-size: 12px;

        &:hover,
        &:focus {
          background-color: transparent;
          font-weight: bold;
        }
      `)}

  ${(props) =>
    props.$fontWeight &&
    css`
      font-weight: ${props.$fontWeight};
    `}
  ${(props) =>
    props.$fontSize &&
    css`
      font-size: ${props.$fontSize};
    `}
  ${(props) =>
    props.$margin &&
    css`
      margin: ${props.$margin};
    `}
  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width};
    `}
  ${(props) =>
    props.disabled &&
    css`
      filter: opacity(0.7);
    `}
  ${(props) =>
    props.$padding &&
    css`
      padding: ${props.$padding};
    `}
  ${(props) =>
    props.$icon &&
    css`
      &::before {
        position: absolute;
        display: inline-block;

        width: 20px;
        height: 20px;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        content: url(${props.$icon});
      }
    `}
`;

export default ButtonStyled;
