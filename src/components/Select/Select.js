/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SelectStyled, ReactSelectStyled } from './SelectStyled';

const Select = ({ name, values, value, onChange, label, required }) => {
  const handleChange = option => {
    onChange(name, option);
  };

  return (
    <SelectStyled>
      <ReactSelectStyled
        classNamePrefix="react-select"
        placeholder={label}
        value={value}
        required={required}
        onChange={handleChange}
        options={values}
        name={name}
      />
    </SelectStyled>
  );
};

Select.propTypes = {
  values: PropTypes.arrayOf(PropTypes.any),
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  onChange: PropTypes.func
};

Select.defaultProps = {
  values: [],
  label: '',
  required: false,
  name: '',
  value: {},
  onChange: () => {}
};

export default Select;
