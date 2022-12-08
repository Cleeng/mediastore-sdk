import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null
};

export const submitPaymentWithoutDetails = createAsyncThunk(
  'payment/submitPaymentWithoutDetails',
  async () => {
    const {
      responseData: { paymentMethods }
    } = await submitPaymentWithoutDetails();
    return paymentMethods;
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
    [submitPaymentWithoutDetails.rejected]: (state, { errors }) => {
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

export default paymentSlice.reducer;
