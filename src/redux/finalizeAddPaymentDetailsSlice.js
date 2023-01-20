import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { finalizeAddPaymentDetails } from 'api';

const initialState = {
  loading: false,
  paymentDetails: null,
  error: null
};

export const fetchFinalizeAddPaymentDetails = createAsyncThunk(
  'finalizeAddPaymentDetails',
  async ({ paymentMethodId, details }, { rejectWithValue }) => {
    try {
      const { paymentDetails } = await finalizeAddPaymentDetails(
        paymentMethodId,
        details
      );
      return paymentDetails;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const finalizeAddPaymentDetalisSlice = createSlice({
  name: 'finalizeAddPaymentDetails',
  initialState,
  reducers: {},
  extraReducers: {
    [finalizeAddPaymentDetails.pending]: state => {
      state.loading = true;
    },
    [finalizeAddPaymentDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.paymentDetails = payload;
    },
    [finalizeAddPaymentDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export default finalizeAddPaymentDetalisSlice.reducer;
