import React from 'react';
import PropTypes from 'prop-types';
import { SelectStyled, ReactSelectStyled } from './SelectStyled';

export const mapToSelectFormat = array => {
  const newArray = array.map(item => {
    return {
      label: item,
      value: item
    };
  });

  return newArray;
};

const SelectLegacy = ({
  name,
  values,
  value,
  onChange,
  label,
  required,
  disabled,
  isMyAccount
}) => {
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
        $required={required}
        onChange={handleChange}
        options={values}
        name={name}
        isDisabled={disabled}
        $isMyAccount={isMyAccount}
        getOptionLabel={option => option.label}
      />
    </SelectStyled>
  );
};

SelectLegacy.propTypes = {
  values: PropTypes.arrayOf(PropTypes.any),
  label: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isMyAccount: PropTypes.bool
};

SelectLegacy.defaultProps = {
  values: [],
  label: '',
  required: false,
  name: '',
  value: {},
  onChange: () => null,
  disabled: false,
  isMyAccount: false
};

export default SelectLegacy;
