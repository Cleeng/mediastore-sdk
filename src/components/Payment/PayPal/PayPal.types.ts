export type PayPalProps = {
  onSubmit: () => void;
  isLoading: boolean;
  totalPrice?: number;
  offerId?: string;
};
