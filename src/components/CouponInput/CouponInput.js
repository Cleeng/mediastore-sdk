import React from 'react';
import PropTypes from 'prop-types';
import couponIcon from 'assets/images/input/coupon.svg';
import Input, { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from '../Input';

const CouponInput = ({
  value,
  showMessage,
  message,
  messageType,
  onSubmit,
  onChange,
  couponLoading,
  t
}) => (
  <Input
    placeholder={t('Redeem coupon')}
    icon={couponIcon}
    clearMessageAfterDelay
    clearMessageOnFocus
    blurOnSubmit
    showMessage={showMessage}
    messageType={messageType}
    message={message}
    onSubmit={onSubmit}
    value={value}
    onChange={onChange}
    isCouponInput
    couponLoading={couponLoading}
  />
);

CouponInput.propTypes = {
  value: PropTypes.string,
  showMessage: PropTypes.bool,
  message: PropTypes.node,
  messageType: PropTypes.oneOf([MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS]),
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  t: PropTypes.func,
  couponLoading: PropTypes.bool
};

CouponInput.defaultProps = {
  value: '',
  showMessage: false,
  message: null,
  messageType: MESSAGE_TYPE_FAIL,
  onChange: () => {},
  t: k => k,
  couponLoading: false
};

export default CouponInput;
