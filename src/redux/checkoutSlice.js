import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  offerId: '',
  availablePaymentMethods: []
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    init: (state, { payload }) => {
      state.offerId = payload.offerId || '';
      state.availablePaymentMethods = payload.availablePaymentMethods || [];
    }
  }
});

export const { init } = checkoutSlice.actions;
export default checkoutSlice.reducer;
