import Input from 'components/Input';

type EmailInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error: string;
  label: string;
  floatingLabels?: boolean;
  required: boolean;
  reference?: () => void;
};

const EmailInput = ({
  value,
  onChange,
  onBlur,
  error,
  label = 'Email',
  floatingLabels,
  required,
  reference
}: EmailInputProps) => (
  <Input
    placeholder={label}
    floatingLabels={floatingLabels}
    type="email"
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    required={required}
    reference={reference}
    invalid={!!error}
  />
);

export default EmailInput;
