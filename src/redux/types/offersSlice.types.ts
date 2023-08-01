import { CurrencyFormat } from 'util/planHelper';

// new structure for Offer types
export type Offer = {
  id: string;
  longId: string;
  title: string;
  active: boolean;
  price: {
    amount: number;
    currency: CurrencyFormat;
    taxIncluded: boolean;
  };
  type: 'subscription' | 'pass' | 'rental' | 'live' | 'single';
  billingCycle?: {
    periodUnit: 'week' | 'month' | 'year' | 'season';
    amount: number;
  };
  entitlement?: {
    expirationPolicy: 'fixed-date' | 'duration';
    expiresAt: number;
    duration: {
      amount: number;
      periodUnit: string;
    };
  };
  externalProperties: [];
  appStoreProductIds: object;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  tags: string[];
  localizations?: object[];
  hasLandingPage?: boolean;
  giftable?: boolean;
  seasonGroupId?: string;
};

export type Offers = Offer[];
