import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, getOrder, updateOrder } from '../api';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from '../components/Input';

const initialState = {
  order: {
    priceBreakdown: {
      offerPrice: 0,
      discountAmount: 0,
      taxValue: 0,
      customerServiceFee: 0,
      paymentMethodFee: 0
    },
    discount: { applied: false },
    taxRate: 0,
    country: '',
    totalPrice: 0
  },
  loading: true,
  error: null,
  couponDetails: {
    showMessage: false,
    message: '',
    messageType: MESSAGE_TYPE_SUCCESS
  },
  isCouponLoading: false
};

export const fetchCreateOrder = createAsyncThunk(
  'order/createOrder',
  async (offerId, { rejectWithValue }) => {
    try {
      const {
        responseData: { order }
      } = await createOrder(offerId);
      return order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUpdateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, couponCode }) => {
    const {
      responseData: { order }
    } = await updateOrder(id, { couponCode });
    return order;
  }
);

export const fetchGetOrder = createAsyncThunk('order/getOrder', async id => {
  const {
    responseData: { order }
  } = await getOrder(id);
  return order;
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCreateOrder.pending]: state => {
      state.loading = true;
    },
    [fetchCreateOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.order = payload;
    },
    [fetchCreateOrder.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [fetchUpdateOrder.pending]: state => {
      state.isCouponLoading = true;
    },
    [fetchUpdateOrder.fulfilled]: (state, { payload }) => {
      state.isCouponLoading = false;
      state.order = payload;
      state.couponDetails = {
        showMessage: true,
        message: 'Your coupon has been applied!',
        messageType: MESSAGE_TYPE_SUCCESS
      };
    },
    [fetchUpdateOrder.rejected]: (state, { errors }) => {
      state.isCouponLoading = false;
      state.error = errors[0];
      state.couponDetails = {
        showMessage: true,
        message:
          'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
        messageType: MESSAGE_TYPE_FAIL
      };
    }
  }
});

export default orderSlice.reducer;
