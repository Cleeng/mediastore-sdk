import { ReactNode } from 'react';

export const BUTTON_SIZE = {
  BIG: 'big',
  NORMAL: 'normal'
} as const;

export const BUTTON_VARIANT = {
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
export type ButtonVariant =
  (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export type ButtonProps = {
  children?: ReactNode;
  className?: `msd__button ${string}`;
  disabled?: boolean;
  fontSize?: string;
  fontWeight?: string;
  icon?: string;
  label?: string;
  margin?: string;
  onClickFn?: () => unknown;
  padding?: string;
  size?: ButtonSize;
  testid?: string;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
};

export type ButtonStyledProps = {
  children?: ReactNode;
  $fontSize?: string;
  $fontWeight?: string;
  $icon?: string;
  $margin?: string;
  $padding?: string;
  $size?: ButtonSize;
  $variant?: ButtonVariant;
  $width?: string;
};
