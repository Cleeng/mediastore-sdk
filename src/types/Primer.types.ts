export type PrimerProps = {
  onSubmit: () => void;
  selectPaymentMethod: (paymentMethod: string) => void;
};

export type UsePrimerHookProps = {
  selectPaymentMethod: (paymentMethod: string) => void;
  onSubmit: () => void;
};
