import styled, { css } from 'styled-components';
import {
  FontColor,
  ConfirmColor,
  ErrorColor,
  LineColor,
  White
} from 'styles/variables';

export const AdyenStyled = styled.div.attrs(() => ({
  className: 'msd__payment__adyen'
}))`
  max-width: 375px;
  margin: 12px auto 0 auto;

  ${props =>
    props.isMyAccount &&
    css`
      .adyen-checkout__label__text {
        color: ${FontColor};
        font-size: 12px;
        opacity: 0.8;
      }
    `}
  .adyen-checkout__label--focused
  .adyen-checkout__label__text {
    color: ${FontColor};
    opacity: 1;
  }

  .adyen-checkout__input--error,
  .adyen-checkout__input--error:hover,
  .adyen-checkout__input--invalid,
  .adyen-checkout__input--invalid:hover {
    border-color: ${ErrorColor};
  }

  .adyen-checkout__error-text {
    color: ${ErrorColor};
  }

  .adyen-checkout__input--focus,
  .adyen-checkout__input--focus:hover,
  .adyen-checkout__input:active,
  .adyen-checkout__input:active:hover,
  .adyen-checkout__input:focus,
  .adyen-checkout__input:focus:hover {
    border: 1px solid rgb(81 83 100 / 80%);
    box-shadow: 0 0 5px 2px #f3f3f3;
  }

  .adyen-checkout__spinner {
    border: 3px solid ${FontColor};
    border-top-color: transparent;
  }

  .adyen-checkout__input--valid {
    border-bottom-color: ${ConfirmColor};
  }

  .adyen-checkout__input {
    color: ${FontColor} !important;
    border-color: #d8ddea;
  }

  .input-field {
    color: ${FontColor} !important;
  }

  .adyen-checkout__payment-method {
    border: 1px solid ${LineColor};
    margin: 0;
  }

  .adyen-checkout__payment-method:not(:first-child) {
    border-radius: 0;
  }

  .adyen-checkout__payment-method:first-child {
    border-radius: 12px 12px 0 0;
  }

  .adyen-checkout__payment-method:last-child {
    border-radius: ${({ isAdditionalPayment }) =>
      !isAdditionalPayment ? '0 0 12px 12px' : 'none'};
  }

  .adyen-checkout__payment-method__radio {
    display: none;
  }

  .adyen-checkout__payment-method__header {
    padding: 12px 16px 12px 25px;
    position: relative;
  }

  .adyen-checkout__payment-method--selected {
    border-color: ${ConfirmColor};
    background-color: ${White};
  }

  .adyen-checkout__payment-method__brands {
    padding-right: 35px;
  }

  .adyen-checkout__payment-method--selected
    .adyen-checkout__payment-method__header:before {
    rotate: 180deg;
  }

  .adyen-checkout__payment-method--googlepay
    .adyen-checkout__payment-method__header:before {
    content: none;
    display: none;
  }

  .adyen-checkout__payment-method__header:before {
    content: url("data:image/svg+xml;charset=UTF-8,%3csvg id='Component_60_1' data-name='Component 60 – 1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3e%3cg id='Group_3522' data-name='Group 3522' transform='translate(-1246 -422)'%3e%3cg id='Group_3513' data-name='Group 3513' transform='translate(1246 422)'%3e%3cg id='Group_3515' data-name='Group 3515'%3e%3cpath id='Path_2546' data-name='Path 2546' d='M7316.21-6266.358l4.922,4.921,4.921-4.921' transform='translate(-7311.131 6274.746)' fill='none' stroke='%23a5a5a5' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.2'/%3e%3cg id='Ellipse_461' data-name='Ellipse 461' transform='translate(0)' fill='none' stroke='%23a5a5a5' stroke-width='1.2'%3e%3ccircle cx='10' cy='10' r='10' stroke='none'/%3e%3ccircle cx='10' cy='10' r='9.4' fill='none'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e ");
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 16px;
  }
`;

export const ConfirmButtonStyled = styled.div`
  margin-top: 32px;
`;
