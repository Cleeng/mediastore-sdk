export const MESSAGE_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

export type MessageType =
  | typeof MESSAGE_TYPE.SUCCESS
  | typeof MESSAGE_TYPE.ERROR
  | '';

export type Message = {
  message: string;
  type: MessageType;
};

export type UseMessageReturnType = {
  message: string;
  type: MessageType;
  setMessage: (newMessage: Message) => void;
  resetMessage: () => void;
};
