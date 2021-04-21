import { useState } from 'react';

const useMessage = () => {
  const [message, setMessageText] = useState('');
  const [type, setType] = useState('');

  const setMessage = newMessage => {
    setMessageText(newMessage.message);
    setType(newMessage.type);
  };

  const resetMessage = () => {
    setMessageText('');
    setType('');
  };

  return [message, type, setMessage, resetMessage];
};

export default useMessage;
