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
      const { items } = await listCustomerTransactions();
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    toggleTransactionList(state) {
      state.isListExpanded = !state.isListExpanded;
    },
    removePausedTransactions(state, { payload }) {
      state.transactions = state.transactions.filter(
        ({ offerId }) => !payload.includes(offerId)
      );
      state.showToggleButton =
        state.transactions.length > DEFAULT_TRANSACTIONS_NUMBER;
    }
  },
  extraReducers: {
    [fetchListCustomerTransactions.pending]: (state) => {
      state.loading = true;
    },
    [fetchListCustomerTransactions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.transactions = payload;
      state.showToggleButton = payload.length > DEFAULT_TRANSACTIONS_NUMBER;
    },
    [fetchListCustomerTransactions.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export const { toggleTransactionList, removePausedTransactions } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
