import { Price } from './Price.types';
import { OfferType } from './OfferType.types';

export type GeoRestriction = {
  type: string;
  countries: string[];
};

export type BillingCycle = {
  periodUnit: string;
  amount: number;
};

export type Entitlement = {
  expirationPolicy: string;
  expiresAt?: number;
  duration?: {
    amount: number;
    periodUnit: string;
  };
};

export type Event = {
  startsAt: number;
  endsAt: number;
  timezone: string;
};

export type FreeTrial = {
  type: 'day' | 'period';
  duration: number;
};

export type ExternalProperties = {
  [key: string]: string | number;
};

export type AppStoreProductIds = {
  apple?: string;
  android?: string;
};

export type Localization = {
  id: string;
  title: string;
  description: string;
  countryCode: string;
  price: Price;
  freeTrial?: FreeTrial;
  geoRestriction: GeoRestriction[];
};

export type OfferV2 = {
  id: string;
  longId: string;
  title: string;
  description: string;
  price: Price | undefined;
  active: boolean;
  type: OfferType;
  geoRestriction: GeoRestriction[];
  tags: string[];
  billingCycle?: BillingCycle;
  entitlement?: Entitlement;
  event?: Event;
  freeTrial?: FreeTrial;
  createdAt: number;
  updatedAt: number;
  externalProperties: ExternalProperties;
  appStoreProductIds: AppStoreProductIds;
  imageUrl: string;
  hasLandingPage: boolean;
  localizations: Localization[];
  sessionsLimit: number;
  giftable: boolean;
};

export default OfferV2;
