import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isErrorMsg } from 'util/reduxValidation';
import { CurrencyFormat } from 'util/planHelper';
import { createOrder, getOrder, updateOrder } from '../api';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from '../components/Input';
import { RootState } from './rootReducer';

type Order = {
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
  currency: CurrencyFormat;
  totalPrice: number;
  id: string;
  couponDetails: object;
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
    currency: 'EUR',
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
