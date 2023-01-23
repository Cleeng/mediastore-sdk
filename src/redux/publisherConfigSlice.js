import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  offerId: '',
  paymentMethods: [],
  displayGracePeriodError: false
};

export const publisherConfigSlice = createSlice({
  name: 'publisherConfig',
  initialState,
  reducers: {
    init: (state, { payload }) => {
      state.offerId = payload.offerId || '';
      state.displayGracePeriodError = payload.displayGracePeriodError;
    },
    updatePaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    }
  }
});

export const { init, updatePaymentMethods } = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
