import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { finalizeInitialPayment } from 'api';
import eventDispatcher, {
  MSSDK_PURCHASE_FAILED,
  MSSDK_PURCHASE_SUCCESSFUL
} from 'util/eventDispatcher';
import { RootState } from './rootReducer';

export type Payment = {
  currency: unknown;
  id: number | null;
  paymentMethod: unknown;
};

export type InitialState = {
  loading: boolean;
  payment: Payment;
  error: string | null | undefined;
  shouldShowFinalizePaymentComponent: boolean;
};

const initialState: InitialState = {
  loading: false,
  payment: {
    id: null,
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
    rejectValue: string;
  }
>(
  'finalizeInitialPayment',
  async ({ orderId, details }, { rejectWithValue }) => {
    try {
      const { payment } = await finalizeInitialPayment(orderId, details);
      return payment;
    } catch (err) {
      const typedError = err as Error;
      return rejectWithValue(typedError.message);
    }
  }
);

export const finalizePaymentSlice = createSlice({
  name: 'finalizeInitialPayment',
  initialState,
  reducers: (create) => ({
    setShouldShowFinalizePaymentComponent: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.shouldShowFinalizePaymentComponent = action.payload;
      }
    )
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchFinalizeInitialPayment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchFinalizeInitialPayment.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.payment = payload;
        state.shouldShowFinalizePaymentComponent = true;
        eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
          payload
        });
      }
    );
    builder.addCase(
      fetchFinalizeInitialPayment.rejected,
      (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.error = payload;
        }
        state.shouldShowFinalizePaymentComponent = true;
        eventDispatcher(MSSDK_PURCHASE_FAILED, {
          payload
        });
      }
    );
  }
});

export const selectFinalizePayment = (state: RootState) =>
  state.finalizeInitialPayment;

export const { setShouldShowFinalizePaymentComponent } =
  finalizePaymentSlice.actions;

export default finalizePaymentSlice.reducer;
