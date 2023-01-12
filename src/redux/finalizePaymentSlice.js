import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { finalizeInitialPayment } from 'api';

const initialState = {
  loading: false,
  payment: null,
  error: null
};

export const fetchFinalizeInitialPayment = createAsyncThunk(
  'finalizeInitialPayment',
  async ({ orderId, details }, { rejectWithValue }) => {
    try {
      const { responseData } = await finalizeInitialPayment(orderId, details);
      return responseData;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const finalizePaymentSlice = createSlice({
  name: 'finalizeInitialPayment',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFinalizeInitialPayment.pending]: state => {
      state.loading = true;
    },
    [fetchFinalizeInitialPayment.fulfilled]: (state, { payload }) => {
      console.log('fullfilled', { payload });
      state.loading = false;
      state.payment = payload;
    },
    [fetchFinalizeInitialPayment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload; // TODO: check if this can be displayer or we need to show custom nice message
    }
  }
});

export default finalizePaymentSlice.reducer;
