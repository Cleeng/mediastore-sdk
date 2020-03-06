import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';
import googleIcon from './img/google.png';
import fbIcon from './img/fb.svg';
import { media } from '../../styles/BreakPoints';

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  height: 55px;

  color: ${colors.ButtonMainFontColor};
  background-color: ${colors.ButtonBackground};
  border: 1px ${colors.ButtonBorderColor} solid;
  border-radius: 6px;
  outline: 0;

  text-align: center;
  text-decoration: none;
  letter-spacing: 0.025em;
  font-family: 'Geomanist';
  font-size: 16px;

  cursor: pointer;

  &:active{
    outline: none;
  }
  &:focus{
    outline: 2px solid ${colors.FocusColor};
  }

  ${props =>
    !props.disabled &&
    !props.variant &&
    css`
      &:hover,
      &:focus {
        cursor: pointer;
        background-color: ${colors.ButtonHoverColor};
      }
    `}
  ${props =>
    !props.disabled &&
    props.variant &&
    css`
      &:hover,
      &:focus {
        cursor: pointer;
        background-color: ${colors.LightGrey};
      }
    `}

  ${props =>
    (props.variant === 'google' || props.variant === 'fb') &&
    css`
      position: relative;
      display: flex;
      justify-content: center;

      background-color: transparent;
      color: ${colors.MainTextColor};
      width: 80px;
      height: 40px;

      text-align: center;
      font-size: 13px;
      &::before {
        display: inline-block;

        width: 20px;
        height: 20px;
      }
    `}
  ${props =>
    props.variant === 'google' &&
    css`
      &::before {
        content: url(${googleIcon});
      }
    `}

  ${props =>
    props.variant === 'fb' &&
    css`
      &::before {
        content: url(${fbIcon});
      }
    `}

  ${props =>
    props.variant === 'paymentmethod' &&
    css`
      flex: 1 0 21%;

      background-color: white;
      color: ${colors.MainTextColor};
      ${p =>
        p.disabled
          ? css`
              filter: opacity(0.5);
            `
          : css`
              &:hover,
              &:focus {
                background-color: ${colors.MediumGrey};

                cursor: pointer;
              }
            `}
    `}
  ${props =>
    props.variant === 'secondary' &&
    css`
      background-color: ${colors.LightGrey};
      color: ${colors.MainTextColor};
      &:hover,
      &:focus {
        cursor: pointer;
        background-color: ${colors.ButtonBorderColor};
      }
    `}

  ${props =>
    props.variant === 'couponApply' &&
    css`
      width: min-content;
      height: 34px;
      margin: 0 0 18px auto;

      background-color: ${colors.LightGrey};
      color: ${colors.MainTextColor};

      font-size: 12px;
      line-height: 34px;
      &:disabled {
        opacity: 0.6;
        &:hover {
          cursor: not-allowed;
          background-color: ${colors.LightGrey};
        }
      }
      ${media.smallest`
        font-size: 13px;
        padding: 0px 10px;
      `}
    `}

  ${props =>
    props.variant === 'link' &&
    css`
      display: inline-block;

      width: auto;
      height: auto;

      outline: 0;
      border-radius: none;
      border: none;
      background-color: transparent;
      color: ${colors.MainTextColor};

      text-align: center;
      text-decoration: underline;
      line-height: 1;
      letter-spacing: 0.025em;
      font-family: 'Geomanist';
      font-weight: 300;
      font-size: 12px;
      cursor: pointer;

      &:hover,
      &:focus {
        background-color: transparent;

        font-weight: bold;
      }
    `}

  ${props =>
    props.variant === 'back' &&
    css`
      position: absolute;
      top: 50%;
      left: 0;

      height: auto;
      width: auto;
      outline: 0;
      border: none;
      border-radius: none;

      background-color: transparent;
      color: ${colors.MainTextColor};

      text-align: center;
      text-decoration: none;
      line-height: 1;
      letter-spacing: 0.025em;
      cursor: pointer;
      font-family: 'Geomanist';
      font-size: 16px;

      transform: translateY(-45%);
      &:hover,
      &:focus {
        background-color: transparent;
        font-weight: bold;
        &::before {
          font-weight: initial;
        }
      }
      &::before {
        display: inline-block;
        padding-right: 5px;
        width: 10px;
        content: '<';
      }

      ${media.small`
        top: 20px;
        left: 0px;
      `}
    `}
`;

export default ButtonStyled;
