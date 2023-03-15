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
  | 'manual';

export type PaymentGateway = 'adyen' | 'paypal' | 'manual';

export type PublisherConfigInitialState = {
  offerId: string;
  paymentMethods: {
    id: number;
    logoUrl: string;
    methodName: PaymentMethodName;
    paymentGateway: PaymentGateway;
  }[];
  adyenConfiguration: null | AdyenConfiguration;
  displayGracePeriodError: boolean;
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
