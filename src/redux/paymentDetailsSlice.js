import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPaymentDetails } from '../api';

const initialState = {
  paymentDetails: [],
  paymentDetailsLoading: true,
  paymentDetailsError: [],
  activeOrBoundPaymentDetails: []
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
      state.paymentDetailsLoading = true;
    },
    [fetchPaymentDetails.fulfilled]: (state, { payload }) => {
      state.paymentDetailsLoading = false;
      state.paymentDetails = payload?.paymentDetails;
      state.activeOrBoundPaymentDetails = payload?.paymentDetails.filter(
        item => item.active || item.bound
      );
    },
    [fetchPaymentDetails.rejected]: (state, { payload }) => {
      state.paymentDetailsLoading = false;
      state.paymentDetailsError = payload;
    }
  }
});

export default paymentDetailsSlice.reducer;
