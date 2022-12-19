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
        {/* my account */}
        {!offerId && (
          <>
            {t(
              'Paying with PayPal is easy. Click the button below and sign in to your PayPal account.'
            )}
            <br />
            <br />
            {t(
              'Note, PayPal is subject to an additional 8% fee that will be added to your next payments.'
            )}
          </>
        )}
        {/* checkout */}
        {offerId &&
          totalPrice !== 0 &&
          t('Click ‘Continue with PayPal‘ to complete your purchase.')}
        {offerId?.charAt(0) === 'S' &&
          totalPrice === 0 &&
          t(
            'Click ‘Continue with PayPal‘ to complete your purchase. Note, PayPal is subject to an additional 8% fee that will be added to your next payments.'
          )}
      </>
    </PayPalContentStyled>
  );
};

PayPal.propTypes = {
  totalPrice: PropTypes.number,
  offerId: PropTypes.string,
  t: PropTypes.func
};

PayPal.defaultProps = {
  totalPrice: null,
  offerId: null,
  t: k => k
};

export default PayPal;
