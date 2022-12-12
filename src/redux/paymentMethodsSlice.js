import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPaymentMethods } from '../api';

const initialState = {
  paymentMethods: null,
  loading: false,
  error: null,
  availablePaymentMethods: null
};

export const fetchPaymentMethods = createAsyncThunk(
  'paymentMethods/fetchPaymentMethods',
  async () => {
    const { paymentMethods } = await getPaymentMethods();
    return paymentMethods;
  }
);

export const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPaymentMethods.pending]: state => {
      state.loading = true;
    },
    [fetchPaymentMethods.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.offer = payload;
    },
    [fetchPaymentMethods.rejected]: (state, { errors: [error] }) => {
      state.loading = false;
      state.error = error;
    }
  }
});

export default paymentMethodsSlice.reducer;
