export type PrimerProps = {
  onSubmit: (id?: string) => void;
  selectPaymentMethod: (paymentMethod: string) => void;
  isMyAccount?: boolean;
};

export type UsePrimerHookProps = {
  selectPaymentMethod: (paymentMethod: string) => void;
  onSubmit: (id?: string) => void;
  isMyAccount?: boolean;
};
