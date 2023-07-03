import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaymentDetails } from 'api';
import { PaymentDetail } from 'api/Customer/types/getPaymentDetails.types';
import { RootState } from './rootReducer';
import { PaymentDetailsInitialState } from './types';

const initialState: PaymentDetailsInitialState = {
  paymentDetails: [],
  activeOrBoundPaymentDetails: [],
  loading: true,
  error: null
};

export const fetchPaymentDetails = createAsyncThunk<
  { paymentDetails: PaymentDetail[] },
  void,
  {
    rejectValue: string;
  }
>('paymentDetails', async (_, { rejectWithValue }) => {
  try {
    return await getPaymentDetails();
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError.message);
  }
});

export const paymentDetailsSlice = createSlice({
  name: 'paymentDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPaymentDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPaymentDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.paymentDetails = payload?.paymentDetails;
      state.activeOrBoundPaymentDetails = payload?.paymentDetails.filter(
        item => item.active || item.bound
      );
    });
    builder.addCase(fetchPaymentDetails.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  }
});

export const selectPaymentDetails = (state: RootState) => state.paymentDetails;

export default paymentDetailsSlice.reducer;
