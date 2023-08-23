export type OfferDetailsProps = {
  period: string;
  freeDays: number;
  currencySymbol: string;
  grossPrice: string;
  taxCopy: string;
  freePeriods: number;
  totalPrice: number;
  offerPrice: number;
  taxRate: number;
  customerPriceInclTax: number;
  discountedPeriods: number;
  discountType: string;
  isTrialAvailable: boolean;
  offerType: string;
  startTime: number;
  expiresAt: number;
};
