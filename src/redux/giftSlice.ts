import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getGift } from 'api';
import { Gift, GiftInitialState } from './types';
import { RootState } from './rootReducer';

export const initialState: GiftInitialState = {
  gift: {},
  loading: false,
  error: null
};

export const fetchGift = createAsyncThunk<
  Gift,
  number,
  {
    rejectValue: string;
  }
>('offer/fetchOffer', async (giftId: number, { rejectWithValue }) => {
  try {
    const result = await getGift(giftId);
    return result as Gift;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const giftSlice = createSlice({
  name: 'gift',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGift.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchGift.fulfilled, (state, action) => {
      state.loading = false;
      state.gift = action.payload;
    });
    builder.addCase(fetchGift.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  }
});

export const selectGift = (state: RootState) => state.gift;

export default giftSlice.reducer;
