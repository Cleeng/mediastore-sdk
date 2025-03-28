export type PrimerProps = {
  onSubmit?: () => void;
  selectPaymentMethod: (paymentMethod: string) => void;
  isMyAccount?: boolean;
};

export type UsePrimerHookProps = {
  selectPaymentMethod: (paymentMethod: string) => void;
  onSubmit?: () => void;
  isMyAccount?: boolean;
};
