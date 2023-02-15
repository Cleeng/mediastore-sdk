import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPaymentDetails } from '../api';

const initialState = {
  paymentDetails: [],
  activeOrBoundPaymentDetails: [],
  loading: true,
  error: []
};

export const fetchPaymentDetails = createAsyncThunk(
  'paymentDetails',
  async (_, { rejectWithValue }) => {
    try {
      const responseData = await getPaymentDetails();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const paymentDetailsSlice = createSlice({
  name: 'paymentDetails',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPaymentDetails.pending]: state => {
      state.loading = true;
    },
    [fetchPaymentDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.paymentDetails = payload?.paymentDetails;
      state.activeOrBoundPaymentDetails = payload?.paymentDetails.filter(
        item => item.active || item.bound
      );
    },
    [fetchPaymentDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export default paymentDetailsSlice.reducer;
