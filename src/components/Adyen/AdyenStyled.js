import styled, { css } from 'styled-components';
import { MainColor, ConfirmColor, ErrorColor } from 'styles/variables';

export const AdyenStyled = styled.div`
  max-width: 320px;
  margin: 50px auto 0 auto;
  ${props =>
    props.isMyAccount &&
    css`
      .adyen-checkout__label__text {
        color: ${MainColor};
        font-size: 12px;
        opacity: 0.8;
      }
    `}

  .adyen-checkout__label--focused 
    .adyen-checkout__label__text {
    color: ${MainColor};
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
    border: 3px solid ${MainColor};
    border-top-color: transparent;
  }
  .adyen-checkout__input--valid {
    border-bottom-color: ${ConfirmColor};
  }
`;

export const ConfirmButtonStyled = styled.div`
  margin-top: 32px;
`;
