import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  publisherId: '',
  offerId: '',
  paymentMethods: [],
  adyenConfiguration: null,
  displayGracePeriodError: false,
  isPayPalHidden: false,
  visiblePaymentMethods: []
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
    }
  }
});

export const { init, updatePaymentMethods } = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
