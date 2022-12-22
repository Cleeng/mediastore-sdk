import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PaypalFullLogo } from 'assets/images/paymentMethods/PayPalColor.svg';
import Button from 'components/Button';
import { PayPalContentStyled, PayPalIconContentStyled } from './PayPalStyled';

const PayPal = ({ totalPrice, offerId, onSubmit, isLoading, t }) => {
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
      <Button
        theme="confirm"
        onClickFn={onSubmit}
        disabled={isLoading}
        sieze="big"
        margin="20px auto auto auto"
        fontSize="15px"
        fontWeight="400"
      >
        {isLoading ? 'Loading...' : ' Continue with PayPal'}
      </Button>
    </PayPalContentStyled>
  );
};

PayPal.propTypes = {
  totalPrice: PropTypes.number,
  offerId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  t: PropTypes.func
};

PayPal.defaultProps = {
  totalPrice: null,
  offerId: null,
  isLoading: false,
  t: k => k
};

export default PayPal;
