import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  WrapStyled,
  InputElementWrapperStyled,
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
      placeholder,
      type,
      value,
      label,
      onChange,
      onSubmit,
      disabled
    } = this.props;

    console.log(placeholder, type, value, onChange, onSubmit, disabled);

    return (
      <WrapStyled>
        <InputElementWrapperStyled>
          <InputElementLabelStyled>{label}</InputElementLabelStyled>
          <InputElementStyled
            placeholder={placeholder}
            type={type}
            value={value}
            disabled={disabled}
          />
        </InputElementWrapperStyled>
      </WrapStyled>
    );
  }
}

export default MyAccountInput;

MyAccountInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool
};

MyAccountInput.defaultProps = {
  placeholder: '',
  type: 'text',
  value: '',
  label: '',
  onChange: () => {},
  onSubmit: () => {},
  disabled: false
};
