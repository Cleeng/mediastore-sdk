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
  max-width: 376px;
  margin: 12px auto 0 auto;

  ${(props) =>
    props.$isMyAccount &&
    css`
      .adyen-checkout__label__text {
        color: ${props.theme.fontColor || FontColor};
        font-size: 12px;
        opacity: 0.8;
      }
    `}
  .adyen-checkout__button.adyen-checkout__button--pay {
    background: ${(props) => props.theme.successColor || ConfirmColor};
  }
  .adyen-checkout__payment-method__details__content {
    margin: 2px 0 20px;
  }

  .adyen-checkout__label--focused .adyen-checkout__label__text {
    color: ${(props) => props.theme.fontColor || FontColor};
    opacity: 1;
  }

  .adyen-checkout__input--error,
  .adyen-checkout__input--error:hover,
  .adyen-checkout__input--invalid,
  .adyen-checkout__input--invalid:hover {
    border-color: ${(props) => props.theme.errorColor || ErrorColor};
  }

  .adyen-checkout__error-text {
    color: ${(props) => props.theme.errorColor || ErrorColor};
  }

  .adyen-checkout__input--focus,
  .adyen-checkout__input--focus:hover,
  .adyen-checkout__input:active,
  .adyen-checkout__input:active:hover,
  .adyen-checkout__input:focus,
  .adyen-checkout__input:focus:hover {
    border: 1px solid ${(props) => props.theme.successColor || ConfirmColor};
    box-shadow: 0 0 5px 2px #f3f3f3;
  }

  .adyen-checkout__spinner {
    border: 3px solid ${(props) => props.theme.fontColor || FontColor};
    border-top-color: transparent;
  }

  .adyen-checkout__input--valid {
    border-bottom-color: ${(props) => props.theme.successColor || ConfirmColor};
  }

  .adyen-checkout__input,
  .adyen-checkout__dropdown__button {
    border-color: #d8ddea;
    box-shadow: none;
  }
  .adyen-checkout__dropdown__button--active {
    border: 1px solid ${(props) => props.theme.successColor || ConfirmColor};
    box-shadow: 0 0 5px 2px #f3f3f3;
  }

  .input-field,
  .adyen-checkout__dropdown__list {
    color: ${(props) => props.theme.fontColor || FontColor} !important;
  }

  .adyen-checkout__payment-method {
    border: 1px solid ${LineColor};
    margin-bottom: 10px;
    border-radius: 12px;
    overflow: hidden;
  }

  .adyen-checkout__payment-method.adyen-checkout__payment-method--selected {
    overflow: visible;
  }

  .adyen-checkout__payment-method--selected {
    border-color: ${(props) => props.theme.successColor || ConfirmColor};
    background-color: ${White};
  }
  .adyen-checkout__payment-method__radio--selected {
    background-color: ${(props) => props.theme.successColor || ConfirmColor};
  }

  .checkbox-wrapper {
    display: flex;
    flex-direction: column;
    margin: 10px 20px 20px 20px;
  }

  .adyen-checkout__card-input {
    text-align: start;
  }

  .adyen-checkout__bank-checkbox {
    align-items: flex-start;
    font-size: 11px;
    font-weight: 400;
    line-height: 17px;
    color: #515364;
    gap: 3px;
    margin-bottom: 20px;
  }

  .adyen-checkout__bank-checkbox--error {
    .msd__consents__frame {
      border-color: ${(props) => props.theme.errorColor || ErrorColor};
    }
    .msd__consents__text {
      color: ${(props) => props.theme.errorColor || ErrorColor};
    }
  }

  .adyen-checkout__payment-method--standalone {
    .adyen-checkout__payment-method__header {
      padding: 13px 16px;
    }
  }

  ${(props) =>
    props.$isAdditionalPayment &&
    css`
      .adyen-checkout__payment-method--standalone {
        .adyen-checkout__payment-method__header {
          padding-block: 12px;
          padding-inline: 44px 16px;
        }

        .adyen-checkout__payment-method__radio {
          display: block;
        }
      }
    `}
`;

export default AdyenStyled;
