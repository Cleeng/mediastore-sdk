import { useState } from 'react';

const useInput = initialValue => {
  const [value, setHookValue] = useState(initialValue);
  const [error, setError] = useState('');

  const setValue = v => {
    const newValue = v || '';
    setError('');
    setHookValue(newValue);
  };

  const onChange = newValue => {
    setValue(newValue);
  };

  return { value, setValue, error, setError, onChange };
};

export default useInput;
