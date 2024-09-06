import { ReactNode } from 'react';

export const BUTTON_SIZE = {
  BIG: 'big',
  NORMAL: 'normal'
} as const;

export const BUTTON_THEME = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SIMPLE: 'simple',
  NAVLINK: 'navLink',
  LINK: 'link',
  PAYMENT: 'payment',
  CONFIRM: 'confirm',
  PAYPAL: 'paypal',
  DANGER: 'danger'
} as const;

export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];
export type ButtonTheme = (typeof BUTTON_THEME)[keyof typeof BUTTON_THEME];

export type ButtonProps = {
  children?: ReactNode;
  disabled?: boolean;
  fontSize?: string;
  fontWeight?: string;
  icon?: string;
  label?: string;
  margin?: string;
  onClickFn?: () => void;
  padding?: string;
  size?: ButtonSize;
  testid?: string;
  theme?: ButtonTheme;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
};
