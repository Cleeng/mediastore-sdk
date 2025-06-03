import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import updateSubscription from 'api/Customer/updateSubscription';
import {
  FetchUnsubscribeParams,
  UnsubscribeInitialState
} from 'appRedux/types';
import { RootState } from './rootReducer';

export const initialState: UnsubscribeInitialState = {
  loading: false,
  error: null
};

export const fetchUnsubscribe = createAsyncThunk<
  void,
  FetchUnsubscribeParams,
  {
    rejectValue: string;
  }
>(
  'unsubscribe/fetchUnsubscribe',
  async ({ offerId, isPauseActive, checkedReason }, { rejectWithValue }) => {
    try {
      const result = await updateSubscription({
        offerId,
        status: isPauseActive ? 'terminated' : 'cancelled',
        cancellationReason: checkedReason
      });

      return result;
    } catch (err) {
      const typedError = err as Error;
      return rejectWithValue(typedError.message);
    }
  }
);

export const unsubscribeSlice = createSlice({
  name: 'unsubscribe',
  initialState,
  reducers: () => ({}),
  extraReducers: (builder) => {
    builder.addCase(fetchUnsubscribe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUnsubscribe.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchUnsubscribe.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) {
        state.error = payload;
      }
    });
  }
});

export const selectUnsubscribe = (state: RootState) => state.unsubscribe;

export default unsubscribeSlice.reducer;
