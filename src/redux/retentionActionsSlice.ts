import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRetentionActions } from 'api';
import { RootState } from './rootReducer';
import {
  RetentionActions,
  RetentionActionsInitialState
} from './types/retentionActionsSlice.types';

export const initialState: RetentionActionsInitialState = {
  error: null,
  isLoading: false,
  retentionActions: {
    type: '',
    extensionDetails: { periodUnit: '', amount: 0 }
  }
};

export const fetchRetentionActions = createAsyncThunk<
  RetentionActions,
  string,
  {
    rejectValue: string;
  }
>('fetchRetentionActions', async (offerId: string, { rejectWithValue }) => {
  try {
    const result = await getRetentionActions(offerId);
    return result;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const retentionActionsSlice = createSlice({
  name: 'retentionActions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRetentionActions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchRetentionActions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.retentionActions = action.payload;
    });
    builder.addCase(fetchRetentionActions.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      }
    });
  }
});

export const selectRetentionActions = (state: RootState) =>
  state.retentionActions;

export default retentionActionsSlice.reducer;
