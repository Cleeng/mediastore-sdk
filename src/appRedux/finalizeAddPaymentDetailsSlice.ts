import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { finalizeAddPaymentDetails as finalizeAddPaymentDetailsApi } from '../api';
import eventDispatcher, {
  MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL
} from '../util/eventDispatcher';
import { PaymentDetails } from './types';

type FinalizeAddPaymentDetailsState = {
  loading: boolean;
  paymentDetails: PaymentDetails | null;
  error: string | null;
};

type FetchFinalizeAddPaymentDetailsArgs = {
  paymentMethodId?: number | string;
  details?: PaymentDetails;
};

const initialState: FinalizeAddPaymentDetailsState = {
  loading: false,
  paymentDetails: null,
  error: null
};

export const fetchFinalizeAddPaymentDetails = createAsyncThunk<
  PaymentDetails,
  FetchFinalizeAddPaymentDetailsArgs,
  { rejectValue: string; state: RootState }
>(
  'finalizeAddPaymentDetails/fetch',
  async ({ paymentMethodId, details }, { getState, rejectWithValue }) => {
    const {
      paymentMethods: { selectedPaymentMethod }
    } = getState();
    try {
      const response = await finalizeAddPaymentDetailsApi(
        paymentMethodId ?? selectedPaymentMethod?.id,
        details
      );
      return response.paymentDetails as PaymentDetails;
    } catch (err) {
      const error = err as Error;
      return rejectWithValue(error.message);
    }
  }
);

export const finalizeAddPaymentDetailsSlice = createSlice({
  name: 'finalizeAddPaymentDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFinalizeAddPaymentDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchFinalizeAddPaymentDetails.fulfilled,
      (state, action: PayloadAction<PaymentDetails>) => {
        state.loading = false;
        state.paymentDetails = action.payload;
        state.error = null;
        eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL, {
          payload: action.payload
        });
      }
    );
    builder.addCase(
      fetchFinalizeAddPaymentDetails.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error =
          action.payload ?? 'Failed to finalize add payment details';
      }
    );
  }
});

export const selectFinalizeAddPaymentDetailsLoading = (state: RootState) =>
  state.finalizeAddPaymentDetails.loading;

export const selectFinalizeAddPaymentDetailsResult = (state: RootState) =>
  state.finalizeAddPaymentDetails.paymentDetails;

export const selectFinalizeAddPaymentDetailsError = (state: RootState) =>
  state.finalizeAddPaymentDetails.error;

export default finalizeAddPaymentDetailsSlice.reducer;
