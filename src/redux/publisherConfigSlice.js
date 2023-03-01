import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    init: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    updatePaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    },
    setPublisherId: (state, { payload }) => {
      state.publisherId = payload;
    }
  }
});

export const {
  init,
  updatePaymentMethods,
  setPublisherId
} = publisherConfigSlice.actions;
export default publisherConfigSlice.reducer;
