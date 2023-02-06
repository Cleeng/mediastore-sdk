import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  offerId: '',
  paymentMethods: [],
  adyenConfiguration: null,
  displayGracePeriodError: false
};

export const publisherConfigSlice = createSlice({
  name: 'publisherConfig',
  initialState,
  reducers: {
    init: (state, { payload }) => {
      state.offerId = payload.offerId || '';
      state.adyenConfiguration = payload.adyenConfiguration || null;
      state.displayGracePeriodError = payload.displayGracePeriodError;
    },
    updatePaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    }
  }
});

export const { init, updatePaymentMethods } = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
