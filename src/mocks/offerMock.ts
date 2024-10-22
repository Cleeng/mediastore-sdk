import { OfferInitialState } from 'appRedux/types';

const offerMock: OfferInitialState = {
  offer: {
    accessGranted: true,
    accessToTags: ['premium', 'exclusive'],
    active: true,
    applicableTaxRate: 0.2,
    applyServiceFeeOnCustomer: true,
    averageRating: 4.5,
    contentAgeRestriction: null,
    contentExternalData: {},
    contentExternalId: 'content-12345',
    contentType: 'video',
    createdAt: 1680000000,
    customerCountry: 'US',
    customerCurrency: 'USD',
    customerCurrencySymbol: '$',
    customerPriceExclTax: 100,
    customerPriceInclTax: 120,
    discountPeriods: [],
    discountedCustomerPriceExclTax: 80,
    discountedCustomerPriceInclTax: 96,
    endTime: null,
    expiresAt: 1690000000,
    freeDays: 30,
    freePeriods: 1,
    geoRestrictionCountries: ['US', 'CA', 'UK'],
    geoRestrictionEnabled: true,
    geoRestrictionType: 'whitelist',
    offerCountry: 'US',
    offerCurrency: 'USD',
    offerCurrencySymbol: '$',
    offerDescription: 'Exclusive premium offer with additional benefits.',
    offerId: 'S111111111_PL',
    offerPrice: 100,
    offerTitle: 'Premium Membership',
    offerUrl: 'https://example.com/premium-offer',
    period: 'monthly',
    socialCommissionRate: 0.1,
    startTime: 1680000000,
    timeZone: 'America/New_York',
    trialAvailable: true,
    updatedAt: 1685000000,
    videoId: 'VIDEO12345'
  },
  offerV2: {
    id: 'S111111111',
    longId: 'S111111111_US',
    title: 'Premium Membership V2',
    description: 'Updated exclusive premium offer with enhanced benefits.',
    price: {
      amount: 100,
      currency: 'USD',
      taxIncluded: true,
      rules: []
    },
    active: true,
    type: 'subscription',
    geoRestriction: [
      {
        type: 'whitelist',
        countries: ['US', 'CA', 'UK']
      }
    ],
    tags: ['premium', 'exclusive', 'v2'],
    billingCycle: {
      periodUnit: 'month',
      amount: 1
    },
    entitlement: {
      expirationPolicy: 'fixed',
      expiresAt: 1690000000,
      duration: {
        amount: 1,
        periodUnit: 'month'
      }
    },
    event: {
      startsAt: 1680000000,
      endsAt: 1690000000,
      timezone: 'America/New_York'
    },
    freeTrial: {
      type: 'day',
      duration: 14
    },
    externalProperties: {
      promoCode: 'PREMIUM2023',
      referralId: 'REF12345'
    },
    appStoreProductIds: {
      apple: 'com.example.premium',
      android: 'com.example.premium.android'
    },
    sessionsLimit: 100,
    giftable: true,
    createdAt: 1680000000,
    updatedAt: 1685000000,
    imageUrl: 'https://example.com/images/premium.png',
    hasLandingPage: true,
    localizations: [
      {
        id: 'LOC_US',
        title: 'Premium Membership',
        description:
          'Exclusive premium offer with additional benefits for US users.',
        countryCode: 'US',
        price: {
          amount: 100,
          currency: 'USD',
          taxIncluded: true,
          rules: []
        },
        freeTrial: {
          type: 'day',
          duration: 14
        },
        geoRestriction: [
          {
            type: 'whitelist',
            countries: ['US', 'CA', 'UK']
          }
        ]
      }
    ]
  },
  loading: false,
  error: null,
  isOfferFree: false
};
export default offerMock;
