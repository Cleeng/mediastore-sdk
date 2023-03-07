export type OfferProps = {
  onSubmit: (str: string) => void;
  onPaymentComplete: () => void;
  t?: (str: string) => string;
};
