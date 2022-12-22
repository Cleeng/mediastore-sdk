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
    currency: '',
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
  async (offerId, { rejectWithValue }) => {
    try {
      const { order } = await createOrder(offerId);
      return order;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUpdateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { order } = await updateOrder(id, payload);
      return order;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUpdateCoupon = createAsyncThunk(
  'order/updateCoupon',
  async ({ id, couponCode }, { rejectWithValue }) => {
    try {
      const { order } = await updateOrder(id, { couponCode });
      return order;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchGetOrder = createAsyncThunk(
  'order/getOrder',
  async (id, { rejectWithValue }) => {
    try {
      const { order } = await getOrder(id);
      return order;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

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
    [fetchGetOrder.pending]: state => {
      state.loading = true;
    },
    [fetchGetOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.order = payload;
    },
    [fetchGetOrder.rejected]: state => {
      state.loading = false;
    },
    [fetchUpdateCoupon.pending]: state => {
      state.isCouponLoading = true;
      state.couponDetails = {
        showMessage: false,
        message: '',
        messageType: MESSAGE_TYPE_SUCCESS
      };
    },
    [fetchUpdateCoupon.fulfilled]: (state, { payload }) => {
      state.isCouponLoading = false;
      state.order = payload;
      state.couponDetails = {
        showMessage: true,
        message: 'Your coupon has been applied!',
        messageType: MESSAGE_TYPE_SUCCESS
      };
    },
    [fetchUpdateCoupon.rejected]: (state, { payload }) => {
      state.isCouponLoading = false;
      state.couponError = payload;
      state.couponDetails = {
        showMessage: true,
        message:
          'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.',
        messageType: MESSAGE_TYPE_FAIL
      };
    },
    [fetchUpdateOrder.pending]: state => {
      state.isUpdateLoading = true;
    },
    [fetchUpdateOrder.fulfilled]: (state, { payload }) => {
      state.isUpdateLoading = false;
      state.order = payload;
    },
    [fetchUpdateOrder.rejected]: (state, { payload }) => {
      state.isUpdateLoading = false;
      state.error = payload;
    }
  }
});

export default orderSlice.reducer;
