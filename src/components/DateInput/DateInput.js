/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Input';
import { ReactComponent as CalendarIcon } from 'assets/images/calendar.svg';

const DateInput = ({ value, onChange, onBlur, error, label, required }) => {
  return (
    <Input
      type="date"
      placeholder={label}
      format="dd/mm/yyyy"
      value={value}
      icon={CalendarIcon}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      required={required}
    />
  );
};

DateInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool
};

DateInput.defaultProps = {
  value: '',
  onChange: () => {},
  onBlur: () => {},
  error: '',
  label: '',
  required: false
};

export default DateInput;
