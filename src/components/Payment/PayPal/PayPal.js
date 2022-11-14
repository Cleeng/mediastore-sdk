import React from 'react';
import PropTypes from 'prop-types';
import { PayPalTextStyled, PayPalWrapperStyled } from '../PaymentStyled';
import Button from '../../Button';
import Loader from '../../Loader';

const PayPal = ({ order, submitPayPal, isLoading, t }) => {
  return (
    <PayPalWrapperStyled>
      <PayPalTextStyled>
        {order.totalPrice === 0 && order.offerId.charAt(0) === 'S'
          ? t(
              'Click ‘Continue with PayPal‘ to complete your purchase. Note, PayPal is subject to an additional 8% fee that will be added to your next payments.'
            )
          : t('Click ‘Continue with PayPal‘ to complete your purchase.')}
      </PayPalTextStyled>
      <Button type="button" theme="payment" onClickFn={submitPayPal}>
        {isLoading ? (
          <Loader buttonLoader color="#ffffff" />
        ) : (
          t('Continue with PayPal')
        )}
      </Button>
    </PayPalWrapperStyled>
  );
};

PayPal.propTypes = {
  order: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func,
  submitPayPal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

PayPal.defaultProps = {
  order: {},
  t: k => k
};

export default PayPal;
