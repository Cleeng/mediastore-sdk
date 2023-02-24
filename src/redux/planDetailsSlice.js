import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCustomerOffers } from '../api';

const initialState = {
  currentPlan: null,
  loading: false,
  error: null
};

export const fetchCustomerOffers = createAsyncThunk(
  'plan/fetchCustomerOffers',
  async (_, { rejectWithValue }) => {
    try {
      const { items } = await getCustomerOffers();
      return items;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const planDetailsSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCustomerOffers.pending]: state => {
      state.loading = true;
    },
    [fetchCustomerOffers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.currentPlan = payload;
    },
    [fetchCustomerOffers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export default planDetailsSlice.reducer;
