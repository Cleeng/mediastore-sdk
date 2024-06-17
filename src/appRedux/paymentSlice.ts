import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitPaymentWithoutDetails as submitPaymentWithoutDetailsRequest } from '../api';
import { RootState } from './rootReducer';

type ErrorMessage = {
  message: string | null;
  translationKey: string;
};

type InitialState = {
  loading: boolean;
  error: ErrorMessage | null;
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
    rejectValue: string;
  }
>('payment/submitPaymentWithoutDetails', async (_, { rejectWithValue }) => {
  try {
    const payment = await submitPaymentWithoutDetailsRequest();
    return payment;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: () => ({}),
  extraReducers: (builder) => {
    builder.addCase(submitPaymentWithoutDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitPaymentWithoutDetails.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(
      submitPaymentWithoutDetails.rejected,
      (state, { payload }) => {
        state.loading = false;
        if (payload?.includes("Order doesn't have paymentMethodId")) {
          state.error = {
            message:
              'Unable to proceed, because of wrong offer settings. Please, contact the owner of the offer',
            translationKey: 'free-offer.error.wrong-offer-settings'
          };
        } else {
          state.error = {
            message:
              'Oops, something went wrong! Please, reload the page and try again',
            translationKey: 'free-offer.error.something-went-wrong'
          };
        }
      }
    );
  }
});

export const selectPayment = (state: RootState) => state.payment;

export default paymentSlice.reducer;
