import { useState } from 'react';
import { Message, MessageType, UseMessageReturnType } from 'types/hooks.types';

const useMessage = (): UseMessageReturnType => {
  const [message, setMessageText] = useState('');
  const [type, setType] = useState<MessageType>('');

  const setMessage = (newMessage: Message) => {
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
