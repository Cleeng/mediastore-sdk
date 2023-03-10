import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

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

type PublisherConfig = {
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

const initialState: PublisherConfig = {
  offerId: '',
  paymentMethods: [],
  adyenConfiguration: null,
  displayGracePeriodError: false
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

export const publisherConfigSlice = createSlice({
  name: 'publisherConfig',
  initialState,
  reducers: {
    init: (
      state,
      action: PayloadAction<
        | OfferIdPayload
        | PaymentMethodsPayload
        | AdyenConfigurationPayload
        | DisplayGracePeriodErrorPayload
      >
    ) => ({
      ...state,
      ...action.payload
    }),
    updatePaymentMethods: (state, action: PayloadAction<[]>) => {
      state.paymentMethods = action.payload;
    }
  }
});

export const selectAdyenConfiguration = (state: RootState) =>
  state.publisherConfig.adyenConfiguration;

export const selectPublisherConfig = (state: RootState) =>
  state.publisherConfig;

export const { init, updatePaymentMethods } = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
