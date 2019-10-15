import styled, { css } from 'styled-components';
import * as colors from '../../styles/variables';
import googleIcon from './img/google.png';
import fbIcon from './img/fb.svg';

const ButtonStyled = styled.button`
  display: block;
  box-sizing: border-box;
  width: 100%;
  outline: 0;
  text-align: center;
  text-decoration: none;
  line-height: 1.3333333;
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
        props.variant === 'creditcard' &&
        css`
          background-color: white;
          color: ${colors.FontLightColor};

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
`;

export default ButtonStyled;
