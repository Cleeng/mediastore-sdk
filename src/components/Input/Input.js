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
  LabelStyled,
  InputIconStyled,
  InputRequiredStyled
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
      ariaInvalid,
      icon,
      required,
      reference
    } = this.props;

    return (
      <InputComponentStyled>
        <InputElementWrapperStyled
          error={error}
          passwordStrength={passwordStrength}
        >
          {icon && <InputIconStyled>{icon.render()}</InputIconStyled>}
          {required && <InputRequiredStyled>*</InputRequiredStyled>}
          <InputElementStyled
            id={placeholder}
            autoComplete="off"
            value={value}
            onChange={event => onChange(event.target.value)}
            type={type}
            onBlur={onBlur}
            ref={reference}
            aria-required={ariaRequired}
            aria-invalid={ariaInvalid}
            aria-describedby={`${placeholder}-desc`}
            withIcon={icon}
          />
          <LabelStyled htmlFor={placeholder} hasValue={value} withIcon={icon}>
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
  ariaInvalid: PropTypes.bool,
  icon: PropTypes.elementType,
  required: PropTypes.bool,
  reference: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) })
  ])
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
  ariaInvalid: false,
  icon: null,
  required: false,
  reference: { current: null }
};

export default Input;
