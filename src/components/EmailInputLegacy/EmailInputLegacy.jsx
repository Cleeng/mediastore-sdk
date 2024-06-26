import React from 'react';
import PropTypes from 'prop-types';
import InputLegacy from 'components/InputLegacy';

const EmailInputLegacy = ({
  value,
  onChange,
  onBlur,
  error,
  label,
  floatingLabels,
  required,
  reference
}) => (
  <InputLegacy
    placeholder={label}
    floatingLabels={floatingLabels}
    type='email'
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    required={required}
    reference={reference}
    ariaRequired={required}
    ariaInvalid={!!error}
  />
);

EmailInputLegacy.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  floatingLabels: PropTypes.bool,
  required: PropTypes.bool,
  reference: PropTypes.oneOfType([PropTypes.func, PropTypes.shape()])
};

EmailInputLegacy.defaultProps = {
  value: '',
  onChange: () => null,
  onBlur: () => null,
  error: '',
  label: 'Email',
  floatingLabels: true,
  required: false,
  reference: () => null
};

export default EmailInputLegacy;
