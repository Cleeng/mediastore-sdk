import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitPaymentWithoutDetails as submitPaymentWithoutDetailsRequest } from '../api';

const initialState = {
  loading: false,
  error: null
};

export const submitPaymentWithoutDetails = createAsyncThunk(
  'payment/submitPaymentWithoutDetails',
  async (_, { rejectWithValue }) => {
    try {
      const payment = await submitPaymentWithoutDetailsRequest();
      return payment;
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
        state.error = {
          message:
            'Unable to proceed, because of wrong offer settings. Please, contact the owner of the offer',
          translationKey: 'free-offer.error.wrong-offer-settings'
        };
      } else {
        state.error = {
          message:
            'Oops, something went wrong! Please, reload the page and try again',
          translationKey: 'free-offer.error.something-went-wrong'
        };
      }
    }
  }
});

export default paymentSlice.reducer;
