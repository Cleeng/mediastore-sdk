import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listCustomerTransactions } from 'api';

export const DEFAULT_TRANSACTIONS_NUMBER = 3;

const initialState = {
  transactions: [],
  error: [],
  showToggleButton: false,
  loading: false,
  isListExpanded: false
};

export const fetchListCustomerTransactions = createAsyncThunk(
  'transactions/listCustomerTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const responseData = await listCustomerTransactions();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setIsTransactionListExpanded(state, { payload }) {
      state.isListExpanded = payload;
    }
  },
  extraReducers: {
    [fetchListCustomerTransactions.pending]: state => {
      state.loading = true;
    },
    [fetchListCustomerTransactions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.transactions = payload.items;
      state.showToggleButton =
        payload.items.length > DEFAULT_TRANSACTIONS_NUMBER;
    },
    [fetchListCustomerTransactions.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export const { setIsTransactionListExpanded } = transactionsSlice.actions;
export default transactionsSlice.reducer;
