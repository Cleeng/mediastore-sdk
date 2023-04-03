import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { finalizeAddPaymentDetails } from 'api';
import eventDispatcher, {
  MSSDK_UPDATE_PAYMENT_DETAILS_FAILED,
  MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL
} from '../util/eventDispatcher';

const initialState = {
  loading: false,
  paymentDetails: null,
  error: null
};

export const fetchFinalizeAddPaymentDetails = createAsyncThunk(
  'finalizeAddPaymentDetails',
  async ({ paymentMethodId, details }, { getState, rejectWithValue }) => {
    const {
      paymentMethods: { selectedPaymentMethod }
    } = getState();
    try {
      const { paymentDetails } = await finalizeAddPaymentDetails(
        paymentMethodId || selectedPaymentMethod?.id,
        details
      );
      return paymentDetails;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const finalizeAddPaymentDetailsSlice = createSlice({
  name: 'finalizeAddPaymentDetails',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFinalizeAddPaymentDetails.pending]: state => {
      state.loading = true;
    },
    [fetchFinalizeAddPaymentDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.paymentDetails = payload;
      state.error = null;
      eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL, {
        payload
      });
    },
    [fetchFinalizeAddPaymentDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED, {
        payload
      });
    }
  }
});

export default finalizeAddPaymentDetailsSlice.reducer;
