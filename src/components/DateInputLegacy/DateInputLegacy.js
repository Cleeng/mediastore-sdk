import React from 'react';
import PropTypes from 'prop-types';
import InputLegacy from 'components/InputLegacy';
import { ReactComponent as CalendarIcon } from 'assets/images/calendar.svg';

const DateInputLegacy = ({
  value,
  onChange,
  onBlur,
  error,
  label,
  required
}) => {
  return (
    <InputLegacy
      type='date'
      placeholder={label}
      format='dd/mm/yyyy'
      value={value}
      icon={CalendarIcon}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      required={required}
    />
  );
};

DateInputLegacy.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool
};

DateInputLegacy.defaultProps = {
  value: '',
  onChange: () => null,
  onBlur: () => null,
  error: '',
  label: '',
  required: false
};

export default DateInputLegacy;
