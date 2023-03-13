import {
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_FAIL
} from 'components/Input/InputConstants';

type MessageType = typeof MESSAGE_TYPE_SUCCESS | typeof MESSAGE_TYPE_FAIL;

export type CouponInputProps = {
  value: string;
  fullWidth?: boolean;
  couponDetails: {
    showMessage: boolean;
    message: React.ReactNode;
    messageType: MessageType;
  };
  onSubmit: (args: string) => void;
  onChange: (args: string) => void;
  onClose?: () => void;
  onInputToggle?: () => void;
  couponLoading: boolean;
  source: 'myaccount' | 'checkout' | '';
};

export type InputComponentStyledProps = {
  fullWidth: boolean;
  isOpened: boolean;
};

export type MessageStyledProps = {
  messageType: MessageType;
  showMessage: boolean;
};

export type InputElementStyledProps = {
  isOpened: boolean;
  fullWidth: boolean;
};

export type CloseButtonStyledProps = {
  isInputOpened: boolean;
};
