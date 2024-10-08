import React from 'react';
import PropTypes from 'prop-types';
import { logos } from 'util/paymentMethodHelper';

import { StyledButton, StyledMethodName } from './PaymentMethodButtonStyled';

const PaymentMethodButton = ({ methodName, onClickFn }) => {
  const LogoComponent = logos[methodName];
  return (
    <StyledButton onClickFn={onClickFn} variant='simple'>
      {LogoComponent ? (
        <LogoComponent />
      ) : (
        <StyledMethodName>{methodName}</StyledMethodName>
      )}
    </StyledButton>
  );
};

PaymentMethodButton.propTypes = {
  methodName: PropTypes.string,
  onClickFn: PropTypes.func
};

PaymentMethodButton.defaultProps = {
  methodName: '',
  onClickFn: () => null
};

export default PaymentMethodButton;
