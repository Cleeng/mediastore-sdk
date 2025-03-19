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
  reducers: (create) => ({
    toggleTransactionList: create.reducer((state) => {
      state.isListExpanded = !state.isListExpanded;
    })
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchListCustomerTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchListCustomerTransactions.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.transactions = payload;
        state.showToggleButton = payload.length > DEFAULT_TRANSACTIONS_NUMBER;
      }
    );
    builder.addCase(
      fetchListCustomerTransactions.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }
    );
  }
});

export const { toggleTransactionList } = transactionsSlice.actions;
export default transactionsSlice.reducer;
