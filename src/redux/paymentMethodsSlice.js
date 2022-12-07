import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPaymentMethods, submitPaymentWithoutDetails } from 'api';

const initialState = {
  paymentMethods: null,
  loading: false,
  error: null,
  availablePaymentMethods: null
};

export const fetchPaymentMethods = createAsyncThunk(
  'paymentMethods/fetchPaymentMethods',
  async () => {
    const { paymentResponse } = await getPaymentMethods();
    return paymentResponse;
  }
);

export const fetchPaymentWithoutDetails = createAsyncThunk(
  'paymentMethods/fetchPaymentWithoutDetails',
  async () => {
    const {
      responseData: { paymentMethods }
    } = await submitPaymentWithoutDetails();
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
    [fetchPaymentMethods.rejected]: (state, { errors }) => {
      state.loading = false;
      state.error = errors[0];
    },
    [fetchPaymentWithoutDetails.pending]: state => {
      state.loading = true;
    },
    [fetchPaymentWithoutDetails.fulfilled]: state => {
      state.loading = false;
    },
    [fetchPaymentWithoutDetails.rejected]: (state, { errors }) => {
      state.loading = false;
      if (errors[0].includes("Order doesn't have paymentMethodId")) {
        state.error =
          'Unable to proceed, because of wrong offer settings. Please, contact the owner of the offer';
      } else {
        state.error =
          'Oops, something went wrong! Please, reload the page and try again';
      }
    }
  }
});

export default paymentMethodsSlice.reducer;
