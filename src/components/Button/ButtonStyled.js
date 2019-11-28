import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';
import googleIcon from './img/google.png';
import fbIcon from './img/fb.svg';
import { media } from '../../styles/BreakPoints';

const ButtonStyled = styled.button`
  display: block;
  box-sizing: border-box;
  width: 100%;
  outline: 0;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.025em;
  cursor: pointer;
  font-family: 'Geomanist';
  color: ${colors.ButtonMainFontColor};
  background-color: ${colors.FontLightColor};
  border: 1px ${colors.ButtonBorderColor} solid;
  border-radius: 6px;
  height: 55px;
  font-size: 16px;
  ${props =>
    !props.disabled &&
    css`
      &:hover,
      &:focus {
        cursor: pointer;
        background-color: ${colors.ButtonBorderColor};
      }
    `}
    ${props =>
      (props.variant === 'google' || props.variant === 'fb') &&
      css`
        background-color: transparent;
        width: 80px;
        height: 40px;
        display: flex;
        justify-content: center;
        text-align: center;
        color: ${colors.FontLightColor};
        font-size: 13px;
        position: relative;
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
          background-color: white;
          color: ${colors.FontLightColor};
          flex: 1 0 21%;

          ${p =>
            p.disabled
              ? css`
                  filter: opacity(0.5);
                `
              : css`
                  &:hover,
                  &:focus {
                    cursor: pointer;
                    background-color: ${colors.MediumGrey};
                  }
                `}
        `}
    ${props =>
      props.variant === 'secondary' &&
      css`
        background-color: ${colors.MediumGrey};
        color: ${colors.FontLightColor};
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
        color: ${colors.FontLightColor};

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
        color: ${colors.FontLightColor};

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
          left: -25px;
        `}
      `}

  & a {
    color: ${colors.FontLightColor};
  }

`;

export default ButtonStyled;
