import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Countries = 'US' | 'CA' | 'BR' | 'PL';

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
      brandsConfiguration: {
        visa: {
          icon: string;
        };
      };
      showBrandIcon: boolean;
      showBrandsUnderCardNumber: boolean;
      positionHolderNameOnTop: boolean;
      billingAddressAllowedCountries: Countries[];
      minimumExpiryDate: string;
      autoFocus: boolean;
    };
  };
  locale: string;
  openFirstPaymentMethod: boolean;
};

type PublisherConfig = {
  offerId: string;
  paymentMethods: [];
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

export const { init, updatePaymentMethods } = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
