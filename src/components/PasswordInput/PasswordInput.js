import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import lock from '../../assets/images/input/lock.svg';

const PasswordInput = ({
  value,
  onChange,
  onBlur,
  error,
  showPassword,
  handleClickShowPassword
}) => (
  <>
    <Input
      placeholder="Password"
      type={showPassword ? 'text' : 'password'}
      icon={lock}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      showVisibilityIcon
      handleClickShowPassword={handleClickShowPassword}
      showPassword={showPassword}
    />
  </>
);

PasswordInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  showPassword: PropTypes.bool,
  handleClickShowPassword: PropTypes.func
};

PasswordInput.defaultProps = {
  value: '',
  onChange: () => {},
  onBlur: () => {},
  error: '',
  showPassword: false,
  handleClickShowPassword: () => {}
};

export default PasswordInput;
