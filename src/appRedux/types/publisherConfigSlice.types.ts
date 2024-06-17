export type AdyenConfiguration = {
  checkoutReturnUrl: string;
  myaccountReturnUrl: string;
  analytics: {
    enabled: boolean;
  };
  paymentMethodsConfiguration: {
    card: {
      name: string;
      billingAddressRequired: boolean;
      billingAddressMode: string;
      brands: string[];
      brandsConfiguration: Record<
        string,
        {
          icon: string;
        }
      >;
      showBrandIcon: boolean;
      showBrandsUnderCardNumber: boolean;
      positionHolderNameOnTop: boolean;
      billingAddressAllowedCountries: string[];
      minimumExpiryDate: string;
      autoFocus: boolean;
    };
  };
  locale: string;
  openFirstPaymentMethod: boolean;
};

export type PaymentMethodName =
  | 'card'
  | 'applepay'
  | 'googlepay'
  | 'paypal'
  | 'ideal'
  | 'bancontact_card'
  | 'bancontact_mobile'
  | 'free-offer';

export type PaymentGateway = 'adyen' | 'paypal' | 'free-offer';

export type PublisherConfigInitialState = {
  publisherId: string;
  offerId: string;
  paymentMethods: {
    id: number;
    logoUrl: string;
    methodName: PaymentMethodName;
    paymentGateway: PaymentGateway;
  }[];
  isPayPalHidden: boolean;
  visiblePaymentMethods: PaymentMethodName[];
  hiddenPaymentMethods: number[];
  adyenConfiguration: null | AdyenConfiguration;
  displayGracePeriodError: boolean;
  termsUrl: string;
  resetUrl: string;
  enable3DSRedirectFlow: boolean;
};

type OfferIdPayload = {
  offerId: string;
};
type PaymentMethodsPayload = {
  paymentMethods: [];
};
type AdyenConfigurationPayload = {
  adyenConfiguration: AdyenConfiguration | null;
};
type DisplayGracePeriodErrorPayload = {
  displayGracePeriodError: boolean;
};

export type initPayloadAction =
  | OfferIdPayload
  | PaymentMethodsPayload
  | AdyenConfigurationPayload
  | DisplayGracePeriodErrorPayload;
