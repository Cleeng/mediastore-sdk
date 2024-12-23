import Input from 'components/Input';
import usePasswordInput from './usePasswordInput';

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
  const { passwordError, strengthLabel, handleChange } = usePasswordInput({
    onChange,
    showPasswordStrength
  });

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
