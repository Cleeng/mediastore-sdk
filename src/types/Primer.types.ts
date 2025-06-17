export type PrimerProps = {
  onSubmit?: () => void;
  selectPaymentMethod: (paymentMethod: string, gateway: string) => void;
  isMyAccount?: boolean;
};

export type UsePrimerHookProps = {
  selectPaymentMethod: (paymentMethod: string, gateway: string) => void;
  onSubmit?: () => void;
  isMyAccount?: boolean;
};
