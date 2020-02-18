import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import email from '../../assets/images/input/email.svg';

const EmailInput = ({ value, onChange, onBlur, error, label }) => (
  <Input
    placeholder={label}
    type="email"
    icon={email}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    ariaRequired
    ariaInvalid={!!error}
  />
);

EmailInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string
};

EmailInput.defaultProps = {
  value: '',
  onChange: () => {},
  onBlur: () => {},
  error: '',
  label: 'Email'
};

export default EmailInput;
