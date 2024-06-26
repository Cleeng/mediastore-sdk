import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { inputTheme } from 'styles/variables';
import visibility from './icons/visibleBase64';
import visibilityOff from './icons/unvisibleBase64';
import {
  InputComponentStyled,
  InputElementWrapperStyled,
  InputElementStyled,
  ErrorWrapper,
  StyledButton,
  StyledPasswordVisibility,
  LabelStyled,
  InputRequiredStyled
} from './InputStyled';

const InputLegacy = ({
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
  floatingLabels,
  reference
}) => {
  return (
    <ThemeProvider theme={inputTheme}>
      <InputComponentStyled>
        <InputElementWrapperStyled>
          {required && <InputRequiredStyled>*</InputRequiredStyled>}
          <InputElementStyled
            data-testid='input'
            id={placeholder}
            autoComplete='off'
            value={value}
            onChange={(event) => onChange(event.target.value)}
            type={type}
            onBlur={onBlur}
            ref={reference}
            aria-required={ariaRequired}
            aria-invalid={ariaInvalid}
            $withIcon={icon}
            $floatingLabels={floatingLabels}
          />
          <LabelStyled
            data-testid='input-label'
            htmlFor={placeholder}
            $hasValue={value}
            $withIcon={icon}
          >
            {placeholder}
          </LabelStyled>
          {showVisibilityIcon && (
            <StyledButton
              data-testid='input-visibility-icon'
              onClick={handleClickShowPassword}
              tabIndex='0'
              aria-label='toggle password visibility'
              type='button'
            >
              {showPassword ? (
                <StyledPasswordVisibility src={visibilityOff} alt='' />
              ) : (
                <StyledPasswordVisibility src={visibility} alt='' />
              )}
            </StyledButton>
          )}
        </InputElementWrapperStyled>

        <ErrorWrapper
          $passwordStrength={passwordStrength}
          id={`${placeholder}-desc`}
        >
          {error}
        </ErrorWrapper>
      </InputComponentStyled>
    </ThemeProvider>
  );
};

InputLegacy.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'date', 'email']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  showVisibilityIcon: PropTypes.bool,
  handleClickShowPassword: PropTypes.func,
  showPassword: PropTypes.bool,
  passwordStrength: PropTypes.oneOf([
    'Weak',
    'Fair',
    'Good',
    'Strong',
    'NotValid',
    ''
  ]),
  ariaRequired: PropTypes.bool,
  ariaInvalid: PropTypes.bool,
  icon: PropTypes.elementType,
  required: PropTypes.bool,
  floatingLabels: PropTypes.bool,
  reference: PropTypes.oneOfType([PropTypes.func, PropTypes.shape()])
};

InputLegacy.defaultProps = {
  placeholder: '',
  type: 'text',
  onChange: () => null,
  onBlur: () => null,
  error: '',
  value: '',
  showVisibilityIcon: false,
  handleClickShowPassword: () => null,
  showPassword: false,
  passwordStrength: '',
  ariaRequired: false,
  ariaInvalid: false,
  icon: null,
  required: false,
  floatingLabels: true,
  reference: () => null
};

export default InputLegacy;
