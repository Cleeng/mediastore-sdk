// Add correct types from adyen-web package during migration to adyen-web v6 and Adyen component to TypeScript
// https://cleeng.atlassian.net/browse/MSSDK-2139
export type AdyenProps = {
  isPayPalAvailable: boolean;
  isMyAccount?: boolean;
  onSubmit: unknown; // get type from adyen-web v6
  onAdditionalDetails: unknown; // get type from adyen-web v6
  selectPaymentMethod: (paymentMethod: string) => void;
  getDropIn: (drop: unknown) => void; // get type from adyen-web v6
};
