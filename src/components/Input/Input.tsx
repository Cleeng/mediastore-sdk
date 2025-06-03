import { ThemeProvider } from 'styled-components';
import { inputTheme } from 'styles/variables';
import { PasswordStrength } from 'types/generic.types';
import { ReactNode } from 'react';
import visibility from './icons/visibleBase64';
import visibilityOff from './icons/invisibleBase64';
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

type InputProps = {
  placeholder: string;
  type?: 'text' | 'password' | 'date' | 'email';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string | null;
  showVisibilityIcon?: boolean;
  handleClickShowPassword?: () => void;
  showPassword?: boolean;
  passwordStrength?: PasswordStrength;
  required?: boolean;
  ariaRequired?: boolean;
  invalid?: boolean;
  icon?: ReactNode;
  floatingLabels?: boolean;
  reference?: () => void;
  format?: string;
};

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  showVisibilityIcon,
  handleClickShowPassword,
  showPassword,
  passwordStrength,
  invalid,
  icon,
  required,
  ariaRequired,
  floatingLabels,
  reference,
  format
}: InputProps) => {
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
            required={required}
            aria-required={ariaRequired}
            aria-invalid={invalid}
            $withIcon={!!icon}
            $floatingLabels={!!floatingLabels}
            format={format}
          />
          <LabelStyled
            data-testid='input-label'
            htmlFor={placeholder}
            $hasValue={!!value}
            $withIcon={!!icon}
          >
            {placeholder}
          </LabelStyled>
          {showVisibilityIcon && (
            <StyledButton
              data-testid='input-visibility-icon'
              onClick={handleClickShowPassword}
              tabIndex={0}
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

export default Input;
