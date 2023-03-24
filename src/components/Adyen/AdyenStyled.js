import styled, { css } from 'styled-components';
import {
  FontColor,
  ConfirmColor,
  ErrorColor,
  LineColor,
  White
} from 'styles/variables';

const AdyenStyled = styled.div.attrs(() => ({
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
  .adyen-checkout__button.adyen-checkout__button--pay {
    background: ${ConfirmColor};
    /* border-radius: 30px; */
  }
  .adyen-checkout__payment-method__details__content {
    margin: 2px 0 20px;
  }

  .adyen-checkout__label--focused .adyen-checkout__label__text {
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
    border: 1px solid ${ConfirmColor};
    box-shadow: 0 0 5px 2px #f3f3f3;
  }

  .adyen-checkout__spinner {
    border: 3px solid ${FontColor};
    border-top-color: transparent;
  }

  .adyen-checkout__input--valid {
    border-bottom-color: ${ConfirmColor};
  }

  .adyen-checkout__input,
  .adyen-checkout__dropdown__button {
    color: ${FontColor} !important;
    border-color: #d8ddea;
    box-shadow: none;
  }
  .adyen-checkout__dropdown__button--active {
    border: 1px solid ${ConfirmColor};
    box-shadow: 0 0 5px 2px #f3f3f3;
  }

  .input-field,
  .adyen-checkout__dropdown__list {
    color: ${FontColor} !important;
  }

  .adyen-checkout__payment-method {
    border: 1px solid ${LineColor};
    margin-bottom: 10px;
    border-radius: 12px;
    overflow: hidden;
  }

  .adyen-checkout__payment-method:not(:first-child) {
    /* border-radius: 0; */
  }

  .adyen-checkout__payment-method:first-child {
    /* border-radius: 12px 12px 0 0; */
  }

  .adyen-checkout__payment-method:last-child {
    /* border-radius: ${({ isAdditionalPayment }) =>
      isAdditionalPayment ? 'none' : '12px'}; */
  }

  .adyen-checkout__payment-method--selected {
    border-color: ${ConfirmColor};
    background-color: ${White};
  }
  .adyen-checkout__payment-method__radio--selected {
    background-color: ${ConfirmColor};
  }

  .adyen__bank-copy {
    font-size: 11px;
    margin: 10px 20px 20px 20px;
    line-height: 17px;
    font-weight: 400;
    color: #7b849d;
    text-align: center;
  }

  ${({ isAdditionalPayment }) =>
    isAdditionalPayment &&
    css`
      .adyen-checkout__payment-method--standalone {
        .adyen-checkout__payment-method__header {
          padding: 12px 16px 12px 44px;
        }
        .adyen-checkout__payment-method__radio {
          display: block;
        }
      }
    `}
`;

export default AdyenStyled;
