export const offerDetailsMock = {
  title: 'Monthly subscription - basic plan',
  customerCurrencySymbol: '$',
  freePeriods: 2,
  freeDays: null,
  period: 'month',
  price: 10,
  discountAmount: 0,
  taxValue: 2.3,
  totalPrice: 12.3,
  trialAvailable: false,
  description: 'Monthly plan. Renews automatically. Cancel anytime you want.',
  customerServiceFee: 0,
  requiredPaymentDetails: true,
  startTime: 1604669476
};

export const subWithTrialDetailsMock = {
  title: 'Monthly subscription with trial',
  customerCurrencySymbol: '$',
  freePeriods: 2,
  freeDays: null,
  period: 'month',
  price: 10,
  discountAmount: 0,
  taxValue: 2.3,
  totalPrice: 12.3,
  trialAvailable: true,
  description: 'Monthly plan. Renews automatically. Cancel anytime you want.',
  customerServiceFee: 0,
  requiredPaymentDetails: true
};

export const seasonPassDetailsMock = {
  title: 'Monthly subscription with trial',
  customerCurrencySymbol: '$',
  freePeriods: 2,
  freeDays: null,
  period: null,
  price: 10,
  discountAmount: 0,
  taxValue: 2.3,
  totalPrice: 12.3,
  trialAvailable: true,
  description: 'Season pass',
  customerServiceFee: 0,
  requiredPaymentDetails: true,
  expiresAt: '1604669476'
};

export const freeOfferDetailsMock = {
  title: 'Monthly subscription - basic plan',
  customerCurrencySymbol: '$',
  freePeriods: 0,
  freeDays: null,
  period: 'month',
  price: 0,
  discountAmount: 0,
  taxValue: 0,
  totalPrice: 0,
  trialAvailable: false,
  description: 'Free offer',
  customerServiceFee: 0,
  requiredPaymentDetails: true
};
