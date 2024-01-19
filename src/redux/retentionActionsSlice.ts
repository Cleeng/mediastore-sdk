import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { applyRetentionAction, getRetentionActions } from 'api';
import { RootState } from './rootReducer';
import {
  RetentionActions,
  RetentionActionsInitialState
} from './types/retentionActionsSlice.types';

export const initialState: RetentionActionsInitialState = {
  error: null,
  isLoading: false,
  isApplyLoading: false,
  retentionActions: {
    type: '',
    offerId: '',
    extensionDetails: { periodUnit: '', amount: 0 },
    downgradeDetails: { offers: [] },
    pauseDetails: {}
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

export const fetchApplyRetentionAction = createAsyncThunk<
  object,
  string,
  {
    rejectValue: string;
  }
>('fetchApplyRetentionAction', async (offerId: string, { rejectWithValue }) => {
  try {
    const result = await applyRetentionAction(offerId);

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
      const offerId = action.meta?.arg;

      state.isLoading = false;
      state.retentionActions = { ...action.payload, offerId };
    });
    builder.addCase(fetchRetentionActions.rejected, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.error = action.payload;
      }
    });
    builder.addCase(fetchApplyRetentionAction.pending, state => {
      state.isApplyLoading = true;
    });
    builder.addCase(fetchApplyRetentionAction.fulfilled, state => {
      state.isApplyLoading = false;
    });
    builder.addCase(fetchApplyRetentionAction.rejected, (state, action) => {
      state.isApplyLoading = false;

      if (action.payload) {
        state.error = action.payload;
      }
    });
  }
});

export const selectRetentionActions = (state: RootState) =>
  state.retentionActions;

export const selectOnlyRetentionActions = (state: RootState) =>
  state.retentionActions.retentionActions;

export const selectRetentionActionsIsLoading = (state: RootState) =>
  state.retentionActions.isLoading;

export default retentionActionsSlice.reducer;
