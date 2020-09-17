import React from 'react';
import PropTypes from 'prop-types';
import { logos } from 'util/paymentMethodHelper';

import { StyledButton, StyledMethodName } from './PaymentMethodButtonStyled';

// eslint-disable-next-line no-unused-vars
const PaymentMethodButton = ({ methodName, onClickFn }) => {
  const LogoComponent = logos[methodName];
  return (
    <StyledButton onClickFn={onClickFn} theme="simple">
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
  onClickFn: () => {}
};

export default PaymentMethodButton;
