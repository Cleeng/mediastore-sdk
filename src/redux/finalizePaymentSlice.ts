import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { finalizeInitialPayment } from 'api';
import eventDispatcher, {
  MSSDK_PURCHASE_FAILED,
  MSSDK_PURCHASE_SUCCESSFUL
} from 'util/eventDispatcher';
import { RootState } from './rootReducer';

type Payment = {
  paymentMethod: unknown;
  currency: unknown;
};

type RejectValueError = {
  message: string;
};

type InitialState = {
  loading: boolean;
  payment: Payment;
  error: string | null | undefined;
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

export const fetchFinalizeInitialPayment = createAsyncThunk<
  Payment,
  { orderId: number | string; details: Record<string, unknown> },
  {
    rejectValue: RejectValueError;
  }
>(
  'finalizeInitialPayment',
  async ({ orderId, details }, { rejectWithValue }) => {
    try {
      const { payment } = await finalizeInitialPayment(orderId, details);
      return payment;
    } catch (err) {
      return rejectWithValue(err as RejectValueError);
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
    builder.addCase(fetchFinalizeInitialPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.payment = action.payload;
      state.shouldShowFinalizePaymentComponent = true;
      const { payload } = action;
      eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
        payload
      });
    });
    builder.addCase(fetchFinalizeInitialPayment.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
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
