import { OfferV2 } from 'types/OfferV2.types';

export type Offer = {
  accessGranted?: boolean;
  accessToTags: string[];
  active: boolean;
  applicableTaxRate: number;
  applyServiceFeeOnCustomer: boolean;
  averageRating: number;
  contentAgeRestriction: unknown;
  contentExternalData: unknown;
  contentExternalId: unknown;
  contentType: unknown;
  createdAt: number;
  customerCountry: string;
  customerCurrency: string;
  customerCurrencySymbol: string;
  customerPriceExclTax: number;
  customerPriceInclTax: number;
  discountPeriods: unknown;
  discountedCustomerPriceExclTax: unknown;
  discountedCustomerPriceInclTax: unknown;
  endTime: unknown;
  expiresAt: number;
  freeDays: number;
  freePeriods: number;
  geoRestrictionCountries: unknown[];
  geoRestrictionEnabled: boolean;
  geoRestrictionType: unknown;
  offerCountry: string;
  offerCurrency: string;
  offerCurrencySymbol: string;
  offerDescription: string;
  offerId: string;
  offerPrice: number;
  offerTitle: string;
  offerUrl: unknown;
  period: string;
  socialCommissionRate: number;
  startTime: number;
  timeZone: unknown;
  trialAvailable: boolean;
  updatedAt: number;
  videoId: unknown;
};

export type OfferInitialState = {
  offer: Offer | Record<string, never>;
  offerV2: OfferV2 | Record<string, never>;
  loading: boolean;
  error: string | null | undefined;
  isOfferFree: boolean;
};

export type OffersInitialState = {
  offers: OfferV2[];
  loading: boolean;
  error: string | null | undefined;
};
