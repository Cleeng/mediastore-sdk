import { SelectStyled, ReactSelectStyled } from './SelectStyled';

type Option = {
  label: string;
  value: string;
};
type SelectProps = {
  values: Option[];
  label: string;
  required: boolean;
  value: Option | null;
  name: string;
  onChange: (name: string, value: Option) => void;
  disabled?: boolean;
  isMyAccount?: boolean;
};

export const mapToSelectFormat = (array: string[]): Option[] => {
  const newArray = array.map(item => {
    return {
      label: item,
      value: item
    };
  });

  return newArray;
};

const Select = ({
  name,
  values,
  value,
  onChange,
  label,
  required,
  disabled,
  isMyAccount
}: SelectProps) => {
  const handleChange = (option: Option | null) => {
    if (!option) {
      return;
    }

    onChange(name, option);
  };

  return (
    <SelectStyled>
      <ReactSelectStyled
        classNamePrefix="react-select"
        placeholder={label}
        value={value}
        required={required}
        $required={required}
        onChange={newValue => handleChange(newValue as Option)}
        options={values}
        name={name}
        isDisabled={disabled}
        $isMyAccount={isMyAccount}
        getOptionLabel={option => (option as Option).label}
      />
    </SelectStyled>
  );
};

export default Select;
