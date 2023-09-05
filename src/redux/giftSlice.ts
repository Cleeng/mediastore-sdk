import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getGift, updateGift } from 'api';
import { DeliveryDetails, Gift, GiftInitialState } from './types';
import { RootState } from './rootReducer';

export const initialState: GiftInitialState = {
  gift: {},
  loading: false,
  error: null,
  isUpdateLoading: false
};

export const fetchGift = createAsyncThunk<
  Gift,
  number,
  {
    rejectValue: string;
  }
>('gift/fetchGift', async (giftId: number, { rejectWithValue }) => {
  try {
    const result = await getGift(giftId);
    return result;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const fetchUpdateGift = createAsyncThunk<
  Gift,
  { id: number; payload: { deliveryDetails: DeliveryDetails } },
  {
    rejectValue: string;
  }
>('gift/updateGift', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const result = await updateGift(id as number, payload);
    return result;
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
    builder.addCase(fetchUpdateGift.pending, state => {
      state.isUpdateLoading = true;
    });
    builder.addCase(fetchUpdateGift.fulfilled, (state, action) => {
      state.isUpdateLoading = false;
      state.gift = action.payload;
    });
    builder.addCase(fetchUpdateGift.rejected, (state, action) => {
      state.isUpdateLoading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  }
});

export const selectGift = (state: RootState) => state.gift;

export default giftSlice.reducer;
