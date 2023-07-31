export type Offer = {
  id: string;
  longId: string;
  title: string;
  active: boolean;
  price: {
    amount: number;
    currency: string;
    taxIncluded: boolean;
  };
  type: 'subscription' | 'pass' | 'rental' | 'live' | 'single';
  billingCycle?: {
    periodUnit: 'week' | 'month' | 'year';
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
  customExternalValue: string;
  appStoreProductIds: object;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  tags: string[];
  hasLandingPage: boolean;
};

export type Offers = Offer[];
