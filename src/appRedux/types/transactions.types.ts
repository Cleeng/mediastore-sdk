export type TransactionsInitialState = {
  transactions: Array<{
    transactionId: string;
    transactionDate: number;
    offerId: string;
    offerType: string;
    offerTitle: string;
    offerPeriod: string;
    publisherSiteName: string;
    transactionPriceExclTax: string;
    transactionCurrency: string;
    contentExternalId: string;
    contentType: string;
    shortUrl: string;
    campaignId: number;
    campaignName: string;
    couponCode: string | null;
    discountType: string;
    discountRate: string;
    discountValue: string;
    discountedOfferPrice: string;
    offerCurrency: string;
    offerPriceExclTax: string;
    applicableTax: string;
    transactionPriceInclTax: string;
    appliedExchangeRateCustomer: string;
    customerId: number;
    customerEmail: string;
    customerLocale: string;
    customerCountry: string;
    customerIpCountry: string;
    customerCurrency: string;
    paymentMethod:
      | 'card'
      | 'googlepay'
      | 'paypal'
      | 'apple'
      | 'roku'
      | 'applepay'
      | 'amazon'
      | 'android'
      | 'ideal'
      | 'bancontact_card'
      | 'bancontact_mobile';
    referalUrl: string;
    transactionExternalData: string;
    publisherId: number;
    taxRate: string;
    targetType: string;
    targetId: number;
  }>;
  error: string;
  showToggleButton: boolean;
  loading: boolean;
  isListExpanded: boolean;
};
