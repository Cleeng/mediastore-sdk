import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { finalizeInitialPayment } from 'api';
import eventDispatcher, {
  MSSDK_PURCHASE_FAILED,
  MSSDK_PURCHASE_SUCCESSFUL
} from 'util/eventDispatcher';

const initialState = {
  loading: false,
  payment: {
    paymentMethod: null,
    currency: null
  },
  error: null,
  shouldShowFinalizePaymentComponent: false
};

export const fetchFinalizeInitialPayment = createAsyncThunk(
  'finalizeInitialPayment',
  async ({ orderId, details }, { rejectWithValue }) => {
    try {
      const { payment } = await finalizeInitialPayment(orderId, details);
      return payment;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const finalizePaymentSlice = createSlice({
  name: 'finalizeInitialPayment',
  initialState,
  reducers: {
    setShouldShowFinalizePaymentComponent(state, { payload }) {
      state.shouldShowFinalizePaymentComponent = payload;
    }
  },
  extraReducers: {
    [fetchFinalizeInitialPayment.pending]: state => {
      state.loading = true;
    },
    [fetchFinalizeInitialPayment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.payment = payload;
      state.shouldShowFinalizePaymentComponent = true;
      eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
        payload
      });
    },
    [fetchFinalizeInitialPayment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.shouldShowFinalizePaymentComponent = true;
      eventDispatcher(MSSDK_PURCHASE_FAILED, {
        payload
      });
    }
  }
});
export const {
  setShouldShowFinalizePaymentComponent
} = finalizePaymentSlice.actions;
export default finalizePaymentSlice.reducer;
