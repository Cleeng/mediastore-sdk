import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

const ButtonStyled = styled.button`
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
  font-family: 'Geomanist';
  font-size: 13px;
  padding: 12px 25px;
  font-weight: 600;
  line-height: initial;

  transition: opacity 0.1s ease-in-out;
  cursor: pointer;

  &:active {
    outline: none;
  }

  &:disabled {
    &:hover {
      cursor: not-allowed;
    }
  }

  ${props =>
    props.size === 'big' &&
    css`
      padding: 20px;
      font-size: 16px;
      font-weight: 400;
    `}
  
  ${props =>
    (props.theme === 'confirm' &&
      css`
        color: ${colors.White};
        background-color: ${colors.ConfirmColor};
        opacity: 0.9;
        &:hover,
        &:focus {
          cursor: pointer;
          opacity: 1;
        }
      `) ||
    (props.theme === 'primary' &&
      css`
        color: ${colors.White};
        background-color: ${colors.MainColor};
        opacity: 0.9;
        &:hover,
        &:focus {
          cursor: pointer;
          opacity: 1;
        }
      `) ||
    (props.theme === 'payment' &&
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
    (props.theme === 'secondary' &&
      css`
        background-color: ${colors.BackgroundColor};
        border: 1px solid ${colors.BackgroundColor};
        color: ${colors.MainColor};
        &:hover,
        &:focus,
        &:active {
          cursor: pointer;
          background-color: ${colors.LineColor};
          border: 1px solid ${colors.LineColor};
        }
      `) ||
    (props.theme === 'simple' &&
      css`
        background-color: transparent;
        border: 1px solid ${colors.LineColor};
        color: ${colors.MainColor};
        &:not(:disabled):hover,
        &:focus {
          cursor: pointer;
          background-color: ${colors.BackgroundColor};
        }
        &:active {
          border: 1px solid ${colors.LineColor};
        }
      `) ||
    (props.theme === 'navLink' &&
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
        color: ${colors.MainColor};
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
    (props.theme === 'link' &&
      css`
        display: inline-block;

        width: auto;
        height: auto;
        padding: 0px;

        border-radius: none;
        background-color: transparent;
        color: ${colors.MainColor};

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

  ${props =>
    props.fontWeight &&
    css`
      font-weight: ${props.fontWeight};
    `}
  ${props =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${props =>
    props.disabled &&
    css`
      filter: opacity(0.7);
    `}
  ${props =>
    props.padding &&
    css`
      padding: ${props.padding};
    `}
  ${props =>
    props.icon &&
    css`
      &::before {
        position: absolute;
        display: inline-block;

        width: 20px;
        height: 20px;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        content: url(${props.icon});
      }
    `}
`;

export default ButtonStyled;
