import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';

const EmailInput = ({ value, onChange, onBlur, error, label, required }) => (
  <Input
    placeholder={label}
    type="email"
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    required={required}
    ariaRequired={required}
    ariaInvalid={!!error}
  />
);

EmailInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool
};

EmailInput.defaultProps = {
  value: '',
  onChange: () => {},
  onBlur: () => {},
  error: '',
  label: 'Email',
  required: false
};

export default EmailInput;
