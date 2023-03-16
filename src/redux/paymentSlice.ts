import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitPaymentWithoutDetails as submitPaymentWithoutDetailsRequest } from '../api';
import { RootState } from './rootReducer';

type RejectValueError = {
  message: string;
};

type InitialState = {
  loading: boolean;
  error: string | null;
};

export type Payment = {
  id: number;
  orderId: number;
  status: string;
  totalAmount: number;
  currency: string;
  customerId: number;
  paymentGateway: string;
  paymentMethod: string;
  externalPaymentId: string;
  couponId: unknown;
  amount: number;
  country: string;
  offerType: string;
  taxValue: number;
  paymentMethodFee: number;
  customerServiceFee: number;
  rejectedReason: unknown;
  refundedReason: unknown;
  paymentDetailsId: unknown;
  paymentOperation: string;
};

const initialState: InitialState = {
  loading: false,
  error: null
};

export const submitPaymentWithoutDetails = createAsyncThunk<
  Payment,
  undefined,
  {
    rejectValue: RejectValueError;
  }
>('payment/submitPaymentWithoutDetails', async (_, { rejectWithValue }) => {
  try {
    const payment = await submitPaymentWithoutDetailsRequest();
    return payment;
  } catch (err) {
    return rejectWithValue(err as RejectValueError);
  }
});

export const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(submitPaymentWithoutDetails.pending, state => {
      state.loading = true;
    });
    builder.addCase(submitPaymentWithoutDetails.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(
      submitPaymentWithoutDetails.rejected,
      (state, { payload }) => {
        state.loading = false;
        if (payload?.message.includes("Order doesn't have paymentMethodId")) {
          state.error =
            'Unable to proceed, because of wrong offer settings. Please, contact the owner of the offer';
        } else {
          state.error =
            'Oops, something went wrong! Please, reload the page and try again';
        }
      }
    );
  }
});

export const selectPayment = (state: RootState) => state.payment;

export default paymentSlice.reducer;
