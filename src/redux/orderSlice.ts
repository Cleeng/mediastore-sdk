import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import isErrorMsg from 'util/reduxValidation';
import { CurrencyFormat } from 'util/planHelper';
import { createOrder, getOrder, updateOrder } from '../api';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from '../components/Input';
import { RootState } from './rootReducer';

type Order = {
  billingAddress: unknown;
  country: string;
  couponId: unknown;
  currency: CurrencyFormat;
  customer: { locale: string; email: string };
  customerId: number;
  discount: { applied: boolean; type: string; periods: number };
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

type Error = string | null;

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

export const fetchCreateOrder = createAsyncThunk(
  'order/createOrder',
  async (offerId: string, { rejectWithValue }) => {
    try {
      const { order } = await createOrder(offerId);
      return order;
    } catch (err) {
      if (isErrorMsg(err)) return rejectWithValue(err.message);
      return err;
    }
  }
);

export const fetchUpdateOrder = createAsyncThunk(
  'order/updateOrder',
  async (
    { id, payload }: { id: number; payload: { [key: string]: unknown } },
    { rejectWithValue }
  ) => {
    try {
      const { order } = await updateOrder(id, payload);
      return order;
    } catch (err) {
      if (isErrorMsg(err)) return rejectWithValue(err.message);
      return err;
    }
  }
);

export const fetchUpdateCoupon = createAsyncThunk(
  'order/updateCoupon',
  async (
    { id, couponCode }: { id: string | number; couponCode: string },
    { rejectWithValue }
  ) => {
    try {
      const { order } = await updateOrder(id, couponCode);
      return order;
    } catch (err) {
      if (isErrorMsg(err)) return rejectWithValue(err.message);
      return err;
    }
  }
);

export const fetchGetOrder = createAsyncThunk(
  'order/getOrder',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const { order } = await getOrder(id);
      return order;
    } catch (err) {
      if (isErrorMsg(err)) return rejectWithValue(err.message);
      return err;
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCreateOrder.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchCreateOrder.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.order = action.payload;
      }
    );
    builder.addCase(fetchCreateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as typeof initialState['error'];
    });
    builder.addCase(fetchGetOrder.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchGetOrder.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.order = action.payload;
      }
    );
    builder.addCase(fetchGetOrder.rejected, state => {
      state.loading = false;
    });
    builder.addCase(fetchUpdateCoupon.pending, state => {
      state.isCouponLoading = true;
      state.couponDetails = {
        showMessage: false,
        message: '',
        messageType: MESSAGE_TYPE_SUCCESS
      };
    });
    builder.addCase(
      fetchUpdateCoupon.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.isCouponLoading = false;
        state.order = action.payload;
        state.couponDetails = {
          showMessage: true,
          message: 'Your coupon has been applied!',
          messageType: MESSAGE_TYPE_SUCCESS
        };
      }
    );
    builder.addCase(fetchUpdateCoupon.rejected, (state, action) => {
      state.isCouponLoading = false;
      state.couponError = action.payload as typeof initialState['couponError'];
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
    builder.addCase(
      fetchUpdateOrder.fulfilled,
      (state, action: PayloadAction<Order>) => {
        state.isUpdateLoading = false;
        state.order = action.payload;
      }
    );
    builder.addCase(fetchUpdateOrder.rejected, (state, action) => {
      state.isUpdateLoading = false;
      state.error = action.payload as typeof initialState['error'];
    });
  }
});

export const selectOrder = (state: RootState) => state.order;
export const selectOnlyOrder = (state: RootState) => state.order.order;

export default orderSlice.reducer;
