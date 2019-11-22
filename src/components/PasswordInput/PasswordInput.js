import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import lock from '../../assets/images/input/lock.svg';

const PasswordInput = ({
  value,
  onChange,
  onBlur,
  error,
  showVisibilityIcon,
  showPassword,
  handleClickShowPassword,
  label
}) => (
  <>
    <Input
      placeholder={label}
      type={showPassword ? 'text' : 'password'}
      icon={lock}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      showVisibilityIcon={showVisibilityIcon}
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
  showVisibilityIcon: PropTypes.bool,
  showPassword: PropTypes.bool,
  handleClickShowPassword: PropTypes.func,
  label: PropTypes.string
};

PasswordInput.defaultProps = {
  value: '',
  onChange: () => {},
  onBlur: () => {},
  error: '',
  showVisibilityIcon: false,
  showPassword: false,
  handleClickShowPassword: () => {},
  label: 'Password'
};

export default PasswordInput;
