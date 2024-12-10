import Input from 'components/Input';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PasswordStrength } from 'types/generic.types';
import getPasswordStrength from 'util/passwordHelper';

type PasswordInputProps = {
  value: string;
  onBlur: () => void;
  error: string;
  onChange: (value: string) => void;
  showVisibilityIcon: boolean;
  showPassword: boolean;
  showPasswordStrength: boolean;
  handleClickShowPassword: () => void;
  label: string;
  floatingLabels: boolean;
};

const PasswordInput = ({
  value,
  onBlur,
  error,
  onChange,
  showVisibilityIcon,
  showPasswordStrength,
  showPassword,
  handleClickShowPassword,
  label = 'Password',
  floatingLabels = true
}: PasswordInputProps) => {
  const { t } = useTranslation();

  const [passwordError, setPasswordError] = useState('');
  const [strengthLabel, setStrengthLabel] = useState<PasswordStrength>();

  const getErrorMessage = (message: PasswordStrength) => {
    const errorMessageLabel = {
      Weak: t('password-input.error.weak', 'Weak'),
      Fair: t('password-input.error.fair', 'Could be stronger'),
      Good: t('password-input.error.good', 'Good password'),
      Strong: t('password-input.error.strong', 'Strong password'),
      NotValid: t(
        'password-input.error.not-valid',
        'Your password must contain at least 8 characters, including 1 digit.'
      )
    };

    return errorMessageLabel[message];
  };

  const handleChange = (password: string) => {
    if (showPasswordStrength) {
      const passwordStrength = getPasswordStrength(password);

      setPasswordError(getErrorMessage(passwordStrength));
      setStrengthLabel(passwordStrength);
    }

    onChange(password);
  };

  return (
    <Input
      placeholder={label}
      floatingLabels={floatingLabels}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      error={error || passwordError}
      showVisibilityIcon={showVisibilityIcon}
      handleClickShowPassword={handleClickShowPassword}
      showPassword={showPassword}
      passwordStrength={strengthLabel}
      ariaRequired
      invalid={strengthLabel === 'NotValid'}
    />
  );
};

export default PasswordInput;
