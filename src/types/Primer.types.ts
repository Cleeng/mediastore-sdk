export type PrimerProps = {
  onSubmit: (id?: string) => void | Promise<void>;
  selectPaymentMethod: (paymentMethod: string) => void;
  isMyAccount?: boolean;
};

export type UsePrimerHookProps = {
  onSubmit: (id?: string) => void | Promise<void>;
  selectPaymentMethod: (paymentMethod: string) => void;
  isMyAccount?: boolean;
};
