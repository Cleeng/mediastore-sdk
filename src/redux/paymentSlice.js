import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitPaymentWithoutDetails as submitPaymentWithoutDetailsRequest } from '../api';

const initialState = {
  loading: false,
  error: null
};

export const submitPaymentWithoutDetails = createAsyncThunk(
  'payment/submitPaymentWithoutDetails',
  async (arg, { rejectWithValue }) => {
    try {
      const { responseData } = await submitPaymentWithoutDetailsRequest();
      return responseData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [submitPaymentWithoutDetails.pending]: state => {
      state.loading = true;
    },
    [submitPaymentWithoutDetails.fulfilled]: state => {
      state.loading = false;
    },
    [submitPaymentWithoutDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload.includes("Order doesn't have paymentMethodId")) {
        state.error =
          'Unable to proceed, because of wrong offer settings. Please, contact the owner of the offer';
      } else {
        state.error =
          'Oops, something went wrong! Please, reload the page and try again';
      }
    }
  }
});

export default paymentSlice.reducer;
