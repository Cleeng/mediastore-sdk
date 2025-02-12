// Add correct types from adyen-web package during migration to adyen-web v6 and Adyen component to TypeScript
type AdyenProps = {
  isPayPalAvailable: boolean;
  isMyAccount?: boolean;
  onSubmit: unknown; // get type from adyen-web v6
  onAdditionalDetails: unknown; // get type from adyen-web v6
  selectPaymentMethod: (paymentMethod: string) => void;
  getDropIn: (drop: unknown) => void; // get type from adyen-web v6
};

export type PaymentDropInProps = {
  adyenProps: AdyenProps;
};
