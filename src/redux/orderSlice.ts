import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  MESSAGE_TYPE_FAIL,
  MESSAGE_TYPE_SUCCESS
} from 'components/InputLegacy';
import { createOrder, getOrder, updateOrder } from '../api';
import { RootState } from './rootReducer';
import { Order, OrderCouponDetailsMessage, OrderInitialState } from './types';

export const orderInitialState: OrderInitialState = {
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
    totalPrice: 0,
    buyAsAGift: false
  },
  loading: true,
  error: '',
  couponDetails: {
    couponCode: '',
    showMessage: false,
    message: '',
    messageType: MESSAGE_TYPE_SUCCESS,
    translationKey: ''
  },
  isCouponLoading: false,
  isUpdateLoading: false
};

export const fetchCreateOrder = createAsyncThunk<
  Order,
  { offerId: string; buyAsAGift: boolean },
  {
    rejectValue: string;
  }
>('order/createOrder', async ({ offerId, buyAsAGift }, { rejectWithValue }) => {
  try {
    const { order } = await createOrder(offerId, buyAsAGift);
    return order;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const fetchUpdateOrder = createAsyncThunk<
  Order,
  { id: number; payload: { [key: string]: unknown } },
  {
    rejectValue: string;
  }
>('order/updateOrder', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { order } = await updateOrder(id, payload);
    return order;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const fetchUpdateCoupon = createAsyncThunk<
  Order,
  { id: string | number; couponCode: string },
  {
    rejectValue: string;
  }
>('order/updateCoupon', async ({ id, couponCode }, { rejectWithValue }) => {
  try {
    const { order } = await updateOrder(id, { couponCode });
    return order;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const fetchGetOrder = createAsyncThunk<
  Order,
  string | number,
  {
    rejectValue: string;
  }
>('order/getOrder', async (id, { rejectWithValue }) => {
  try {
    const { order } = await getOrder(id);
    return order;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: (create) => ({
    clearOrder: create.reducer(() => orderInitialState),
    setOrderCouponMessage: create.reducer(
      (state, action: PayloadAction<OrderCouponDetailsMessage>) => {
        state.couponDetails = {
          ...state.couponDetails,
          ...action.payload
        };
      }
    ),
    clearOrderCouponMessage: create.reducer((state) => {
      const { couponDetails } = state;

      state.couponDetails = {
        ...couponDetails,
        showMessage: false,
        message: '',
        messageType: MESSAGE_TYPE_SUCCESS,
        translationKey: ''
      };
    })
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchCreateOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchCreateOrder.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.error = payload;
      }
    });
    builder.addCase(fetchGetOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchGetOrder.rejected, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpdateCoupon.pending, (state, action) => {
      state.isCouponLoading = true;
      const { couponCode } = action.meta.arg;

      state.couponDetails = {
        couponCode: couponCode || '',
        showMessage: false,
        message: '',
        messageType: MESSAGE_TYPE_SUCCESS,
        translationKey: ''
      };
    });
    builder.addCase(fetchUpdateCoupon.fulfilled, (state, action) => {
      state.isCouponLoading = false;
      state.order = action.payload;
      const { couponCode } = action.meta.arg;

      state.couponDetails = {
        couponCode: couponCode || '',
        showMessage: true,
        message: 'Your coupon has been applied!',
        messageType: MESSAGE_TYPE_SUCCESS,
        translationKey: 'coupon-input.success'
      };
    });
    builder.addCase(fetchUpdateCoupon.rejected, (state, action) => {
      state.isCouponLoading = false;
      const { couponCode } = action.meta.arg;

      state.couponDetails = {
        couponCode: couponCode || '',
        showMessage: true,
        message:
          'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
        messageType: MESSAGE_TYPE_FAIL,
        translationKey: 'coupon-input.error'
      };
    });
    builder.addCase(fetchUpdateOrder.pending, (state) => {
      state.isUpdateLoading = true;
    });
    builder.addCase(fetchUpdateOrder.fulfilled, (state, action) => {
      state.isUpdateLoading = false;
      state.order = action.payload;
    });
    builder.addCase(fetchUpdateOrder.rejected, (state, { payload }) => {
      state.isUpdateLoading = false;
      if (payload) {
        state.error = payload;
      }
    });
  }
});

export const { clearOrder, setOrderCouponMessage, clearOrderCouponMessage } =
  orderSlice.actions;
export const selectOrder = (state: RootState) => state.order;
export const selectOnlyOrder = (state: RootState) => state.order.order;

export default orderSlice.reducer;
