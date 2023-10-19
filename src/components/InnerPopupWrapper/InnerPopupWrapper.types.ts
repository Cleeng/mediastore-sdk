import { ReactNode } from 'react';

export type InnerPopupWrapperProps = {
  steps: number;
  popupTitle?: string;
  currentStep: number;
  children: ReactNode;
  isError?: boolean;
};
