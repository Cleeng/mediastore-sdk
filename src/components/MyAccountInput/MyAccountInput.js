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
      id,
      placeholder,
      type,
      value,
      label,
      onChange,
      onSubmit,
      disabled
    } = this.props;

    return (
      <WrapStyled>
        <InputElementWrapperStyled>
          <InputElementLabelStyled for={id}>{label}</InputElementLabelStyled>
          <InputElementStyled
            id={id}
            placeholder={placeholder}
            type={type}
            value={value}
            disabled={disabled}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        </InputElementWrapperStyled>
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
  disabled: PropTypes.bool
};

MyAccountInput.defaultProps = {
  id: '',
  placeholder: '',
  type: 'text',
  value: '',
  label: '',
  onChange: () => {},
  onSubmit: () => {},
  disabled: false
};
