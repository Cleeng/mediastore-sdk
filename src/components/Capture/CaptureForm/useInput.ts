import { useState } from 'react';

const useInput = (initialValue: string) => {
  const [value, setHookValue] = useState(initialValue);
  const [error, setError] = useState('');

  const setValue = (newValue: string) => {
    const sanitizedValue = newValue || '';
    setError('');
    setHookValue(sanitizedValue);
  };

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  return { value, setValue, error, setError, onChange };
};

export default useInput;
