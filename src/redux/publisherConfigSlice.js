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
    init: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    updatePaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    },
    setGracePeriodError: (state, { payload }) => {
      state.displayGracePeriodError = payload;
    }
  }
});

export const {
  init,
  updatePaymentMethods,
  setGracePeriodError
} = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
