import {
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_FAIL
} from 'components/Input/InputConstants';

export type MessageType =
  | typeof MESSAGE_TYPE_SUCCESS
  | typeof MESSAGE_TYPE_FAIL;

export type CouponInputProps = {
  value: string;
  fullWidth?: boolean;
  couponDetails: {
    showMessage: boolean;
    message: string;
    messageType: MessageType;
    translationKey: string;
  };
  onSubmit: (args: string) => void;
  onChange: (args: string) => void;
  onInputToggle?: () => void;
  couponLoading: boolean;
  source: 'myaccount' | 'checkout' | '';
};

export type FormComponentStyledProps = {
  $fullWidth?: boolean;
  $isOpen: boolean;
};

export type MessageStyledProps = {
  $messageType: '' | MessageType;
  showMessage: boolean;
};

export type InputElementWrapperStyledProps = {
  $isFocused: boolean;
};

export type InputElementStyledProps = {
  $fullWidth?: boolean;
};
