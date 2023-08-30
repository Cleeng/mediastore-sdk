import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getGift, updateGift, verifyGift } from 'api';
import { DeliveryDetails, Gift, GiftInitialState, VerifiedGift } from './types';
import { RootState } from './rootReducer';

export const initialState: GiftInitialState = {
  gift: {},
  verifiedGift: {},
  loading: false,
  error: null
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

export const fetchVerifyGift = createAsyncThunk<
  VerifiedGift,
  string,
  {
    rejectValue: string;
  }
>('gift/verifyGift', async (giftCode: string, { rejectWithValue }) => {
  try {
    const result = await verifyGift(giftCode);

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
      state.loading = true;
    });
    builder.addCase(fetchUpdateGift.fulfilled, (state, action) => {
      state.loading = false;
      state.gift = action.payload;
    });
    builder.addCase(fetchUpdateGift.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
    builder.addCase(fetchVerifyGift.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchVerifyGift.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.verifiedGift = action.payload;
    });
    builder.addCase(fetchVerifyGift.rejected, (state, action) => {
      state.loading = false;
      state.verifiedGift = {};

      if (action.payload) {
        state.error =
          'Provided gift code is invalid. Please provide a valid code and try again.';
      }
    });
  }
});

export const selectGift = (state: RootState) => state.gift;

export default giftSlice.reducer;
