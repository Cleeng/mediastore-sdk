export type InnerPopupWrapperProps = {
  steps: number;
  popupTitle?: string;
  currentStep: number;
  children: React.ReactNode;
  isError?: boolean;
};
