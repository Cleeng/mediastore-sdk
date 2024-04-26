import Input from 'components/Input';
import { ReactComponent as CalendarIcon } from 'assets/images/calendar.svg';

type DateInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error: string;
  label: string;
  required: boolean;
};

const DateInput = ({
  value,
  onChange,
  onBlur,
  error,
  label,
  required
}: DateInputProps) => {
  return (
    <Input
      type="date"
      placeholder={label}
      format="dd/mm/yyyy"
      value={value}
      icon={CalendarIcon}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      required={required}
    />
  );
};

export default DateInput;
