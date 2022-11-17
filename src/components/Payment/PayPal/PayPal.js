import React from 'react';
import PropTypes from 'prop-types';
import { PayPalTextStyled, PayPalWrapperStyled } from '../PaymentStyled';

const PayPal = ({ order, t, selectPaymentMethod }) => {
  return (
    <PayPalWrapperStyled onClick={() => selectPaymentMethod('paypal')}>
      <PayPalTextStyled>
        {order.totalPrice === 0 && order.offerId.charAt(0) === 'S'
          ? t(
              'Click ‘Continue with PayPal‘ to complete your purchase. Note, PayPal is subject to an additional 8% fee that will be added to your next payments.'
            )
          : t('Click ‘Continue with PayPal‘ to complete your purchase.')}
      </PayPalTextStyled>
    </PayPalWrapperStyled>
  );
};

PayPal.propTypes = {
  order: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func,
  selectPaymentMethod: PropTypes.func.isRequired
};

PayPal.defaultProps = {
  order: {},
  t: k => k
};

export default PayPal;
