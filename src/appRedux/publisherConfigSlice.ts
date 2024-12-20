import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import {
  initPayloadAction,
  PublisherConfigInitialState,
  GoogleRecaptchaType
} from './types';

export const initialState: PublisherConfigInitialState = {
  publisherId: '',
  offerId: '',
  paymentMethods: [],
  hiddenPaymentMethods: [],
  isPayPalHidden: false,
  adyenConfiguration: null,
  displayGracePeriodError: false,
  termsUrl: '',
  resetUrl: '',
  enable3DSRedirectFlow: false,
  isPaymentCheckboxDisabled: false,
  googleRecaptcha: {
    showCaptchaOnPurchase: false,
    showCaptchaOnRegister: false,
    sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY
  }
};

export const publisherConfigSlice = createSlice({
  name: 'publisherConfig',
  initialState,
  reducers: (create) => ({
    init: create.reducer((state, action: PayloadAction<initPayloadAction>) => ({
      ...state,
      ...action.payload
    })),
    updatePaymentMethods: create.reducer((state, action: PayloadAction<[]>) => {
      state.paymentMethods = action.payload;
    }),
    updateGoogleRecaptcha: create.reducer(
      (state, action: PayloadAction<Partial<GoogleRecaptchaType>>) => {
        console.log(action.payload);
        console.log({
          ...state.googleRecaptcha,
          ...action.payload
        });
        state.googleRecaptcha = {
          ...state.googleRecaptcha,
          ...action.payload
        };
      }
    ),
    updateHiddenPaymentMethods: create.reducer(
      (state, action: PayloadAction<[]>) => {
        state.hiddenPaymentMethods = action.payload;
      }
    )
  })
});

export const selectAdyenConfiguration = (state: RootState) =>
  state.publisherConfig.adyenConfiguration;

export const selectPublisherConfig = (state: RootState) =>
  state.publisherConfig;

export const selectDisplayGracePeriodError = (state: RootState) =>
  state.publisherConfig.displayGracePeriodError;

export const selectTermsUrl = (state: RootState) =>
  state.publisherConfig.termsUrl;

export const {
  init,
  updatePaymentMethods,
  updateHiddenPaymentMethods,
  updateGoogleRecaptcha
} = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
