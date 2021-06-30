import styled, { css } from 'styled-components';
import { MainColor, ErrorColor, ConfirmColor } from 'styles/variables';

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
    border: 1px solid ${ConfirmColor};
    box-shadow: 0 0 0 2px #d9f5ef;
  }
  .adyen-checkout__spinner {
    border: 3px solid ${ConfirmColor};
    border-top-color: transparent;
  }
`;

export const ConfirmButtonStyled = styled.div`
  margin-top: 32px;
`;
