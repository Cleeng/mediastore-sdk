import React, { Component } from 'react';
import PropTypes from 'prop-types';
import visibility from 'assets/images/visibility.svg';
import visibilityOff from 'assets/images/visibilityOff.svg';
import {
  InputComponentStyled,
  InputElementWrapperStyled,
  InputElementStyled,
  ErrorWrapper,
  StyledButton,
  StyledPasswordVisibility,
  LabelStyled
} from './InputStyled';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      type,
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      showVisibilityIcon,
      handleClickShowPassword,
      showPassword,
      passwordStrength,
      ariaRequired,
      ariaInvalid
    } = this.props;

    return (
      <InputComponentStyled>
        <InputElementWrapperStyled
          error={error}
          passwordStrength={passwordStrength}
        >
          <InputElementStyled
            id={placeholder}
            autoComplete="off"
            value={value}
            onChange={event => onChange(event.target.value)}
            type={type}
            onBlur={onBlur}
            aria-required={ariaRequired}
            aria-invalid={ariaInvalid}
            aria-describedby={`${placeholder}-desc`}
          />
          <LabelStyled htmlFor={placeholder} hasValue={value}>
            {placeholder}
          </LabelStyled>
          {showVisibilityIcon && (
            <StyledButton
              onClick={handleClickShowPassword}
              tabIndex="0"
              aria-label="toggle password visibility"
              type="button"
            >
              {showPassword ? (
                <StyledPasswordVisibility src={visibilityOff} alt="" />
              ) : (
                <StyledPasswordVisibility src={visibility} alt="" />
              )}
            </StyledButton>
          )}
        </InputElementWrapperStyled>

        <ErrorWrapper
          passwordStrength={passwordStrength}
          id={`${placeholder}-desc`}
        >
          {error}
        </ErrorWrapper>
      </InputComponentStyled>
    );
  }
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  showVisibilityIcon: PropTypes.bool,
  handleClickShowPassword: PropTypes.func,
  showPassword: PropTypes.bool,
  passwordStrength: PropTypes.string,
  ariaRequired: PropTypes.bool,
  ariaInvalid: PropTypes.bool
};

Input.defaultProps = {
  placeholder: '',
  type: 'text',
  onChange: () => {},
  onBlur: () => {},
  error: '',
  value: '',
  showVisibilityIcon: false,
  handleClickShowPassword: () => {},
  showPassword: false,
  passwordStrength: '',
  ariaRequired: false,
  ariaInvalid: false
};

export default Input;
