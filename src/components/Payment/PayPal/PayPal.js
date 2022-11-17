import React from 'react';
import PropTypes from 'prop-types';
import {
  ChevronIconWrapperStyled, PayPalContentStyled, PayPalIconContentStyled,
  PayPalIconWrapperStyled,
  PayPalTextStyled,
  PayPalTitleStyled,
  PayPalWrapperStyled
} from '../PaymentStyled';
import { ReactComponent as PaypalLogo } from 'assets/images/paymentMethods/payment-paypal.svg';
import { ReactComponent as PaypalFullLogo } from 'assets/images/paymentMethods/PayPalColor.svg';
import { ReactComponent as Chevron } from 'assets/images/chevron.svg';

const PayPal = ({ order, t, selectPaymentMethod, isActive }) => {
  return (
    <PayPalWrapperStyled isActive={isActive} onClick={() => selectPaymentMethod('paypal')}>
      <PayPalTextStyled>
        <PayPalIconWrapperStyled><PaypalLogo /></PayPalIconWrapperStyled>
        <PayPalTitleStyled>PayPal</PayPalTitleStyled>
        <ChevronIconWrapperStyled isActive={isActive}><Chevron /></ChevronIconWrapperStyled>
        {/* {order.totalPrice === 0 && order.offerId.charAt(0) === 'S' */}
        {/*   ? t( */}
        {/*       'Click ‘Continue with PayPal‘ to complete your purchase. Note, PayPal is subject to an additional 8% fee that will be added to your next payments.' */}
        {/*     ) */}
        {/*   : t('Click ‘Continue with PayPal‘ to complete your purchase.')} */}
      </PayPalTextStyled>
      {isActive && <PayPalContentStyled><PayPalIconContentStyled><PaypalFullLogo/></PayPalIconContentStyled>Paying with PayPal is easy. <b>Click ‘Continue with PayPal’ button below</b> and sign in to your PayPal account. Note, Paypal is subject to an <b>additional 8% fee</b> that will be added to your next payments.</PayPalContentStyled>}
    </PayPalWrapperStyled>
  );
};

PayPal.propTypes = {
  order: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func,
  selectPaymentMethod: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

PayPal.defaultProps = {
  order: {},
  t: k => k
};

export default PayPal;
