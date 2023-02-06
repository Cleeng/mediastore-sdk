import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPaymentMethod: null
};

export const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {
    setSelectedPaymentMethod(state, { payload }) {
      state.selectedPaymentMethod = payload;
    }
  }
});

export const { setSelectedPaymentMethod } = paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;
