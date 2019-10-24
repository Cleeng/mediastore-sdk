import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';
import lock from '../../assets/images/input/lock.svg';

const PasswordInput = ({ value, onChange, onBlur, error }) => (
  <Input
    placeholder="Password"
    type="password"
    icon={lock}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
  />
);

PasswordInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string
};

PasswordInput.defaultProps = {
  value: '',
  onChange: () => {},
  onBlur: () => {},
  error: ''
};

export default PasswordInput;
