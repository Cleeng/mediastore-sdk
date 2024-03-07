export type DropInSectionWrapperStyled = {
  $isSelected: boolean;
  $fadeOutSection: boolean;
};

export type DropInSectionProps = {
  children: React.ReactNode;
  selectPaymentMethod: (paymentMethodName: string) => void;
  title: string;
  logo: string;
  isLoading: boolean;
};
