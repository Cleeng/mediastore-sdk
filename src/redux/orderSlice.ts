import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CurrencyFormat } from 'util/planHelper';
import { createOrder, getOrder, updateOrder } from '../api';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from '../components/Input';
import { RootState } from './rootReducer';

export type Order = {
  billingAddress: unknown;
  country: string;
  couponId: unknown;
  currency: CurrencyFormat;
  customer: { locale: string; email: string };
  customerId: number;
  discount: { applied: boolean; type: 'trial' | 'coupon' | ''; periods: number };
  expirationDate: number;
  id: number;
  offer: {
    title: string;
    description: string;
    price: number;
    currency: string;
  };
  offerId: string;
  paymentMethodId: number;
  priceBreakdown: {
    customerServiceFee: number;
    discountAmount: number;
    discountedPrice: number;
    offerPrice: number;
    paymentMethodFee: number;
    taxValue: number;
  };
  publisherId: number;
  requiredPaymentDetails: boolean;
  taxBreakdown: unknown;
  taxRate: number;
  totalPrice: number;
};

type Error = string | null | undefined;

type RejectValueError = {
  message: string;
};

type InitialState = {
  order: Order;
  loading: boolean;
  error: Error;
  couponDetails: {
    showMessage: boolean;
    message: string;
    messageType: typeof MESSAGE_TYPE_SUCCESS | typeof MESSAGE_TYPE_FAIL;
  };
  isCouponLoading: boolean;
  couponError: Error;
  isUpdateLoading: boolean;
};

const initialState: InitialState = {
  order: {
    billingAddress: '',
    country: '',
    couponId: '',
    currency: 'EUR',
    customer: { locale: '', email: '' },
    customerId: 0,
    discount: { applied: false, type: '', periods: 0 },
    expirationDate: 0,
    id: 0,
    offer: {
      title: '',
      description: '',
      price: 0,
      currency: ''
    },
    offerId: '',
    paymentMethodId: 0,
    priceBreakdown: {
      customerServiceFee: 0,
      discountAmount: 0,
      discountedPrice: 0,
      offerPrice: 0,
      paymentMethodFee: 0,
      taxValue: 0
    },
    publisherId: 0,
    requiredPaymentDetails: false,
    taxBreakdown: '',
    taxRate: 0,
    totalPrice: 0
  },
  loading: true,
  error: null,
  couponDetails: {
    showMessage: false,
    message: '',
    messageType: MESSAGE_TYPE_SUCCESS
  },
  isCouponLoading: false,
  couponError: null,
  isUpdateLoading: false
};

export const fetchCreateOrder = createAsyncThunk<
  Order,
  string,
  {
    rejectValue: RejectValueError;
  }
>('order/createOrder', async (offerId: string, { rejectWithValue }) => {
  try {
    const { order } = await createOrder(offerId);
    return order;
  } catch (err) {
    return rejectWithValue(err as RejectValueError);
  }
});

export const fetchUpdateOrder = createAsyncThunk<
  Order,
  { id: number; payload: { [key: string]: unknown } },
  {
    rejectValue: RejectValueError;
  }
>('order/updateOrder', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { order } = await updateOrder(id, payload);
    return order;
  } catch (err) {
    return rejectWithValue(err as RejectValueError);
  }
});

export const fetchUpdateCoupon = createAsyncThunk<
  Order,
  { id: string | number; couponCode: string },
  {
    rejectValue: RejectValueError;
  }
>('order/updateCoupon', async ({ id, couponCode }, { rejectWithValue }) => {
  try {
    const { order } = await updateOrder(id, { couponCode });
    return order;
  } catch (err) {
    return rejectWithValue(err as RejectValueError);
  }
});

export const fetchGetOrder = createAsyncThunk<
  Order,
  string | number,
  {
    rejectValue: RejectValueError;
  }
>('order/getOrder', async (id, { rejectWithValue }) => {
  try {
    const { order } = await getOrder(id);
    return order;
  } catch (err) {
    return rejectWithValue(err as RejectValueError);
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCreateOrder.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchCreateOrder.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(fetchGetOrder.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchGetOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchGetOrder.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(fetchUpdateCoupon.pending, state => {
      state.isCouponLoading = true;
      state.couponDetails = {
        showMessage: false,
        message: '',
        messageType: MESSAGE_TYPE_SUCCESS
      };
    });
    builder.addCase(fetchUpdateCoupon.fulfilled, (state, action) => {
      state.isCouponLoading = false;
      state.order = action.payload;
      state.couponDetails = {
        showMessage: true,
        message: 'Your coupon has been applied!',
        messageType: MESSAGE_TYPE_SUCCESS
      };
    });
    builder.addCase(fetchUpdateCoupon.rejected, (state, action) => {
      state.isCouponLoading = false;
      if (action.payload) {
        state.couponError = action.payload.message;
      } else {
        state.couponError = action.error.message;
      }
      state.couponDetails = {
        showMessage: true,
        message:
          'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
        messageType: MESSAGE_TYPE_FAIL
      };
    });
    builder.addCase(fetchUpdateOrder.pending, state => {
      state.isUpdateLoading = true;
    });
    builder.addCase(fetchUpdateOrder.fulfilled, (state, action) => {
      state.isUpdateLoading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchUpdateOrder.rejected, (state, action) => {
      state.isUpdateLoading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  }
});

export const selectOrder = (state: RootState) => state.order;
export const selectOnlyOrder = (state: RootState) => state.order.order;

export default orderSlice.reducer;
