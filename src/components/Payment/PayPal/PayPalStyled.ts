import styled from 'styled-components';
import { ErrorColor } from 'styles/variables';

export const PayPalContentStyled = styled.div.attrs(() => ({
  className: 'msd__paypal--wrapper'
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 11px;
  button {
    height: 48px;
  }
`;

export const CopyStyled = styled.p.attrs(() => ({
  className: 'msd__paypal--text'
}))`
  font-size: 11px;
  margin: 20px 15px;
  line-height: 17px;
  font-weight: 400;
  color: #7b849d;
  text-align: center;
`;
export const PayPalIconContentStyled = styled.div.attrs(() => ({
  className: 'msd__paypal--icon'
}))`
  padding-bottom: 20px;
`;

export const CheckboxWrapperStyled = styled.div`
  .msd__consents__text {
    font-size: 11px;
    line-height: 17px;
  }

  .msd__consents__frame {
    align-self: start;
  }

  .adyen-checkout__bank-checkbox {
    color: #515364;
    margin-bottom: 20px;
  }

  .adyen-checkout__bank-checkbox--error {
    .msd__consents__frame {
      border-color: ${ErrorColor};
    }

    .msd__consents__text {
      color: ${ErrorColor};
    }
  }
`;
