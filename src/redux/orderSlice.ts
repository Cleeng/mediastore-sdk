import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, getOrder, updateOrder } from '../api';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from '../components/Input';
import { isErrorMsg } from 'util/reduxValidation';
import { RootState } from './rootReducer';

type InitialState = {
  order: {
    priceBreakdown: {
      offerPrice: number;
      discountAmount: number;
      taxValue: number;
      customerServiceFee: number;
      paymentMethodFee: number;
    };
    discount: { applied: boolean };
    taxRate: number;
    country: string;
    currency: string;
    totalPrice: number;
    id: string;
    couponDetails: {};
  };
  loading: boolean;
  error: string | null;
  couponDetails: {
    showMessage: boolean;
    message: string;
    messageType: typeof MESSAGE_TYPE_SUCCESS | typeof MESSAGE_TYPE_FAIL;
  };
  isCouponLoading: boolean;
  couponError: string | null;
  isUpdateLoading: boolean;
};

const initialState: InitialState = {
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
    totalPrice: 0,
    id: '',
    couponDetails: {}
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
    { id, payload }: { id: string; payload: { [key: string]: unknown } },
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
    { id, couponCode }: { id: string; couponCode: string },
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
  async (id: string, { rejectWithValue }) => {
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
    builder.addCase(fetchCreateOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.order = payload;
    });
    builder.addCase(fetchCreateOrder.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as typeof initialState['error'];
    });
    builder.addCase(fetchGetOrder.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchGetOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.order = payload;
    });
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
    builder.addCase(fetchUpdateCoupon.fulfilled, (state, { payload }) => {
      state.isCouponLoading = false;
      state.order = payload;
      state.couponDetails = {
        showMessage: true,
        message: 'Your coupon has been applied!',
        messageType: MESSAGE_TYPE_SUCCESS
      };
    });
    builder.addCase(fetchUpdateCoupon.rejected, (state, { payload }) => {
      state.isCouponLoading = false;
      state.couponError = payload as typeof initialState['couponError'];
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
    builder.addCase(fetchUpdateOrder.fulfilled, (state, { payload }) => {
      state.isUpdateLoading = false;
      state.order = payload;
    });
    builder.addCase(fetchUpdateOrder.rejected, (state, { payload }) => {
      state.isUpdateLoading = false;
      state.error = payload as typeof initialState['error'];
    });
  }
});

export const selectOrder = (state: RootState) =>
  state.order;

export default orderSlice.reducer;
