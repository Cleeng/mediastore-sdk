export type DropInSectionWrapperStyled = {
  isCardAvailable: boolean;
  isSelected: boolean;
  fadeOutSection: boolean;
};

export type DropInSectionProps = {
  children: React.ReactNode;
  selectPaymentMethod: (paymentMethodName: string) => void;
  title: string;
  logo: string;
  isCardAvailable: boolean;
  isLoading: boolean;
};
