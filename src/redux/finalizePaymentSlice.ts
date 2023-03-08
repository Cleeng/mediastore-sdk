import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { finalizeInitialPayment } from 'api';
import eventDispatcher, {
  MSSDK_PURCHASE_FAILED,
  MSSDK_PURCHASE_SUCCESSFUL
} from 'util/eventDispatcher';
import isErrorMsg from 'util/reduxValidation';
import { RootState } from './rootReducer';

type Payment = {
  paymentMethod: unknown;
  currency: unknown;
};

type InitialState = {
  loading: boolean;
  payment: Payment;
  error: unknown;
  shouldShowFinalizePaymentComponent: boolean;
};

const initialState: InitialState = {
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
  async (
    {
      orderId,
      details
    }: { orderId: number | string; details: Record<string, unknown> },
    { rejectWithValue }
  ) => {
    try {
      const { payment } = await finalizeInitialPayment(orderId, details);
      return payment;
    } catch (err) {
      if (isErrorMsg(err)) return rejectWithValue(err.message);
      return rejectWithValue(err);
    }
  }
);

export const finalizePaymentSlice = createSlice({
  name: 'finalizeInitialPayment',
  initialState,
  reducers: {
    setShouldShowFinalizePaymentComponent(
      state,
      action: PayloadAction<boolean>
    ) {
      state.shouldShowFinalizePaymentComponent = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchFinalizeInitialPayment.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchFinalizeInitialPayment.fulfilled,
      (state, action: PayloadAction<Payment>) => {
        state.loading = false;
        state.error = null;
        state.payment = action.payload;
        state.shouldShowFinalizePaymentComponent = true;
        const { payload } = action;
        eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
          payload
        });
      }
    );
    builder.addCase(fetchFinalizeInitialPayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as typeof initialState['error'];
      state.shouldShowFinalizePaymentComponent = true;
      const { payload } = action;
      eventDispatcher(MSSDK_PURCHASE_FAILED, {
        payload
      });
    });
  }
});

export const selectFinalizePayment = (state: RootState) =>
  state.finalizeInitialPayment;

export const {
  setShouldShowFinalizePaymentComponent
} = finalizePaymentSlice.actions;
export default finalizePaymentSlice.reducer;
