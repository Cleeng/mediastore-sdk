import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ErrorWrapper } from 'components/Input/InputStyled';
import {
  WrapStyled,
  InputElementStyled,
  InputElementLabelStyled
} from './MyAccountInputStyled';

class MyAccountInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id,
      placeholder,
      type,
      min,
      value,
      label,
      onChange,
      onSubmit,
      disabled,
      hideInput,
      error,
      onBlur,
      name,
      autoComplete,
      required,
      width
    } = this.props;

    return (
      <WrapStyled hideInput={hideInput} width={width}>
        <InputElementLabelStyled htmlFor={id}>
          {label}
          {required && ' *'}
        </InputElementLabelStyled>
        <InputElementStyled
          error={error}
          id={id}
          placeholder={placeholder}
          type={type}
          min={min}
          value={value}
          disabled={disabled}
          onSubmit={onSubmit}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          autoComplete={autoComplete}
        />
        <ErrorWrapper id={`${id}-desc`} isMyAccount>
          {error}
        </ErrorWrapper>
      </WrapStyled>
    );
  }
}

export default MyAccountInput;

MyAccountInput.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  min: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  hideInput: PropTypes.bool,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  width: PropTypes.string
};

MyAccountInput.defaultProps = {
  id: '',
  placeholder: '',
  type: 'text',
  value: '',
  min: '',
  label: '',
  onChange: () => null,
  onSubmit: () => null,
  onBlur: () => null,
  disabled: false,
  hideInput: false,
  error: '',
  name: '',
  autoComplete: '',
  required: false,
  width: ''
};
