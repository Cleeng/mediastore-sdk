import React from 'react';
import PropTypes from 'prop-types';
import couponIcon from 'assets/images/input/coupon.svg';
import Input, { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from '../Input';

const CouponInput = ({ showMessage, message, messageType, onSubmit }) => (
  <Input
    placeholder="Redeem coupon"
    icon={couponIcon}
    clearMessageAfterDelay
    clearMessageOnFocus
    blurOnSubmit
    showMessage={showMessage}
    messageType={messageType}
    message={message}
    onSubmit={onSubmit}
  />
);

CouponInput.propTypes = {
  showMessage: PropTypes.bool,
  message: PropTypes.node,
  messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS]),
  onSubmit: PropTypes.func.isRequired
};

CouponInput.defaultProps = {
  showMessage: false,
  message: null,
  messageType: MESSAGE_TYPE_FAIL
};

export default CouponInput;
