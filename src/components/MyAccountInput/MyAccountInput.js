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
      value,
      label,
      onChange,
      onSubmit,
      disabled,
      hideInput,
      error,
      onBlur,
      name,
      autoComplete
    } = this.props;

    return (
      <WrapStyled hideInput={hideInput}>
        <InputElementLabelStyled htmlFor={id}>{label}</InputElementLabelStyled>
        <InputElementStyled
          error={error}
          id={id}
          placeholder={placeholder}
          type={type}
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
  label: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  hideInput: PropTypes.bool,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  autoComplete: PropTypes.string
};

MyAccountInput.defaultProps = {
  id: '',
  placeholder: '',
  type: 'text',
  value: '',
  label: '',
  onChange: () => {},
  onSubmit: () => {},
  onBlur: () => {},
  disabled: false,
  hideInput: false,
  error: '',
  name: '',
  autoComplete: ''
};
