import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { listCustomerTransactions } from 'api';
import { TransactionsInitialState } from './types/transactions.types';

export const DEFAULT_TRANSACTIONS_NUMBER = 3;

const initialState: TransactionsInitialState = {
  transactions: [],
  error: '',
  showToggleButton: false,
  loading: false,
  isListExpanded: false
};

export const fetchListCustomerTransactions = createAsyncThunk<
  TransactionsInitialState['transactions'],
  void,
  {
    rejectValue: string;
  }
>('transactions/listCustomerTransactions', async (_, { rejectWithValue }) => {
  try {
    const { items } = await listCustomerTransactions();
    return items;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: (create) => ({
    toggleTransactionList: create.reducer((state) => {
      state.isListExpanded = !state.isListExpanded;
    }),
    removePausedTransactions: create.reducer(
      (state, { payload }: { payload: string[] }) => {
        state.transactions = state.transactions.filter(
          ({ offerId }) => !payload.includes(offerId)
        );
        state.showToggleButton =
          state.transactions.length > DEFAULT_TRANSACTIONS_NUMBER;
      }
    )
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchListCustomerTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchListCustomerTransactions.fulfilled,
      (
        state,
        { payload }: PayloadAction<TransactionsInitialState['transactions']>
      ) => {
        state.loading = false;
        state.transactions = payload;
        state.showToggleButton = payload.length > DEFAULT_TRANSACTIONS_NUMBER;
      }
    );
    builder.addCase(
      fetchListCustomerTransactions.rejected,
      (state, { payload }: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = payload ?? 'An unknown error occurred';
      }
    );
  }
});

export const { toggleTransactionList, removePausedTransactions } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
