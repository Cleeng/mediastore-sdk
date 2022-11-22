import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PaypalFullLogo } from 'assets/images/paymentMethods/PayPalColor.svg';
import { PayPalContentStyled, PayPalIconContentStyled } from './PayPalStyled';

const PayPal = ({ totalPrice, offerId, t }) => {
  return (
    <PayPalContentStyled>
      <PayPalIconContentStyled>
        <PaypalFullLogo />
      </PayPalIconContentStyled>
      <>
        {totalPrice === 0 && offerId.charAt(0) === 'S'
          ? t(
              'Click ‘Continue with PayPal‘ to complete your purchase. Note, PayPal is subject to an additional 8% fee that will be added to your next payments.'
            )
          : t('Click ‘Continue with PayPal‘ to complete your purchase.')}
      </>
    </PayPalContentStyled>
  );
};

PayPal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  offerId: PropTypes.string.isRequired,
  t: PropTypes.func
};

PayPal.defaultProps = {
  t: k => k
};

export default PayPal;
