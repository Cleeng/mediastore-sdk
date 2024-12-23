import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PasswordStrength } from 'types/generic.types';
import getPasswordStrength from 'util/passwordHelper';

type UsePasswordInputArgs = {
  onChange: (value: string) => void;
  showPasswordStrength: boolean;
};

const usePasswordInput = ({
  onChange,
  showPasswordStrength
}: UsePasswordInputArgs) => {
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

  return {
    passwordError,
    strengthLabel,
    getErrorMessage,
    handleChange
  };
};

export default usePasswordInput;
