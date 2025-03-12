import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { PaymentMethodsInitialState, SelectedPaymentMethod } from './types';

const initialState: PaymentMethodsInitialState = {
  selectedPaymentMethod: null
};

export const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: (create) => ({
    setSelectedPaymentMethod: create.reducer(
      (state, action: PayloadAction<SelectedPaymentMethod>) => {
        state.selectedPaymentMethod = action.payload;
      }
    )
  })
});

export const selectPaymentMethods = (state: RootState) => state.paymentMethods;

export const { setSelectedPaymentMethod } = paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;
