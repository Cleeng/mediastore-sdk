import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPaymentDetails } from '../api';
import { PaymentDetail } from '../api/Customer/getPaymentDetails';
import { RootState } from './rootReducer';

type Error = string | null | undefined;

type PaymentDetails = {
  paymentDetails: PaymentDetail[];
  activeOrBoundPaymentDetails: PaymentDetail[];
  loading: boolean;
  error: Error;
};

const initialState: PaymentDetails = {
  paymentDetails: [],
  activeOrBoundPaymentDetails: [],
  loading: true,
  error: null
};
type RejectValueError = {
  message: string;
};
export const fetchPaymentDetails = createAsyncThunk<
  { paymentDetails: PaymentDetail[] },
  void,
  {
    rejectValue: RejectValueError;
  }
>('paymentDetails', async (_, { rejectWithValue }) => {
  try {
    return await getPaymentDetails();
  } catch (error) {
    return rejectWithValue(error as RejectValueError);
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
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  }
});

export const selectPaymentDetails = (state: RootState) => state.paymentDetails;

export default paymentDetailsSlice.reducer;
