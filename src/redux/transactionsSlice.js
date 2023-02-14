import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listCustomerTransactions } from 'api';

export const DEFAULT_TRANSACTIONS_NUMBER = 3;

const initialState = {
  transactionsList: [],
  transactionsError: [],
  showToggleButton: false,
  isTransactionsSectionLoading: false,
  isTransactionListExpanded: false
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
      state.isTransactionListExpanded = payload;
    }
  },
  extraReducers: {
    [fetchListCustomerTransactions.pending]: state => {
      state.isTransactionsSectionLoading = true;
    },
    [fetchListCustomerTransactions.fulfilled]: (state, { payload }) => {
      state.isTransactionsSectionLoading = false;
      state.transactionsList = payload.items;
      state.showToggleButton =
        payload.items.length > DEFAULT_TRANSACTIONS_NUMBER;
    },
    [fetchListCustomerTransactions.rejected]: (state, { payload }) => {
      state.isTransactionsSectionLoading = false;
      state.transactionsError = payload;
    }
  }
});

export const { setIsTransactionListExpanded } = transactionsSlice.actions;
export default transactionsSlice.reducer;
