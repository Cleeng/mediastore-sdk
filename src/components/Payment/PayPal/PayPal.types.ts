export type PayPalProps = {
  onSubmit: () => void;
  isMyAccount?: boolean;
  isLoading: boolean;
  totalPrice?: number;
  offerId?: string;
};
