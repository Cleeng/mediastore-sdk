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
  font-size: 16px;
  line-height: initial;

  cursor: pointer;

  &:active {
    outline: none;
  }

  ${props =>
    (props.size === 'small' &&
      css`
        padding: 12px 20px;
        font-size: 11px;
      `) ||
    (props.size === 'big' &&
      css`
        padding: 20px;
        font-size: 16px;
        font-weight: 400;
      `)}
  
  ${props =>
    (props.theme === 'primary' &&
      css`
        color: ${colors.ButtonMainFontColor};
        background-color: ${colors.ButtonBackground};

        &:hover,
        &:focus {
          cursor: pointer;
          background-color: ${colors.ButtonHoverColor};
        }
      `) ||
    (props.theme === 'payment' &&
      css`
        height: 48px;
        width: 30%;
        min-width: max-content;

        padding: 15px;
        border-radius: 6px;

        color: ${colors.ButtonMainFontColor};
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
        background-color: ${colors.ButtonSecondaryBackground};
        border: 1px solid ${colors.ButtonSecondaryBackground};
        color: ${colors.MainTextColor};
        &:hover,
        &:focus,
        &:active {
          cursor: pointer;
          background-color: ${colors.ButtonBorderColor};
          border: 1px solid ${colors.ButtonBorderColor};
        }
      `) ||
    (props.theme === 'danger' &&
      css`
        background-color: ${colors.ErrorColor};
        border: none;
        color: ${colors.MyAccountMainColor};
        opacity: 0.8;
        &:not(:disabled):hover,
        &:focus {
          cursor: pointer;
          background-color: ${colors.ErrorColor};
          opacity: 1;
        }
      `) ||
    (props.theme === 'simple' &&
      css`
        background-color: ${colors.ButtonMainFontColor};
        border: 1px solid ${colors.ButtonBorder};
        color: ${colors.MainTextColor};
        &:not(:disabled):hover,
        &:focus {
          cursor: pointer;
          background-color: ${colors.LightGrey};
        }
        &:active {
          border: 1px solid ${colors.ButtonMainFontColor};
        }
      `) ||
    (props.theme === 'navLink' &&
      css`
        position: absolute;
        top: 50%;
        left: 0;

        height: auto;
        width: auto;
        border-radius: none;

        transform: translateY(-45%);
        background-color: transparent;
        color: ${colors.MainTextColor};
        font-size: 16px;
        letter-spacing: 0.025em;

        &::before {
          content: '<';
          margin-right: 5px;
        }
        &:hover,
        &:focus {
          font-weight: 700;
          text-decoration: none;
        }
        ${media.small`
          top: 20px;
          left: 0px;
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
        color: ${colors.MainTextColor};

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
