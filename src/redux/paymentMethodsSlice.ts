import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

const initialState: { selectedPaymentMethod: Record<string, unknown> } = {
  selectedPaymentMethod: {}
};

export const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {
    setSelectedPaymentMethod(
      state,
      action: PayloadAction<Record<string, unknown>>
    ) {
      state.selectedPaymentMethod = action.payload;
    }
  }
});

export const selectPaymentMethods = (state: RootState) => state.paymentMethods;

export const { setSelectedPaymentMethod } = paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;
