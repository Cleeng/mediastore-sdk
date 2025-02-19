import { ReactNode } from 'react';

export type MessageBoxType = 'success' | 'error';

export type SubscriptionStyledProps = {
  as?: string;
  $cursorPointer?: boolean;
  $isSelected?: boolean;
  $hide?: boolean;
  children?: ReactNode;
};
