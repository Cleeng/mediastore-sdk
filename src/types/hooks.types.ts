export type MessageType = 'success' | 'error' | '';

export type Message = {
  message: string;
  type: MessageType;
};

export type UseMessageReturnType = [
  string,
  MessageType,
  (newMessage: Message) => void,
  () => void
];
