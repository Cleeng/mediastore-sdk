import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 0,
  offerId: '',
  availablePaymentMethods: []
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    init: (state, { payload }) => {
      state = { ...initialState, ...payload };
    },
    changeStep: (state, { payload }) => {
      state.currentStep = payload;
    }
  }
});

export const { changeStep, init } = checkoutSlice.actions;
export default checkoutSlice.reducer;
