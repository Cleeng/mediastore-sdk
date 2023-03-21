import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { initPayloadAction, PublisherConfigInitialState } from './types';

export const initialState: PublisherConfigInitialState = {
  publisherId: '',
  offerId: '',
  paymentMethods: [],
  adyenConfiguration: null,
  displayGracePeriodError: false
};

export const publisherConfigSlice = createSlice({
  name: 'publisherConfig',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<initPayloadAction>) => ({
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

export const selectDisplayGracePeriodError = (state: RootState) =>
  state.publisherConfig.displayGracePeriodError;

export const { init, updatePaymentMethods } = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
