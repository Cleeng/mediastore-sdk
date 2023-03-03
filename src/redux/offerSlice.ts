import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOfferDetails } from '../api';
import { isErrorMsg } from 'util/reduxValidation';

type InitialState = {
  offer: {
    trialAvailable: boolean;
  };
  loading: boolean;
  error: string | null;
  isOfferFree: boolean;
};

const initialState: InitialState = {
  offer: {
    trialAvailable: false
  },
  loading: false,
  error: null,
  isOfferFree: false
};

export const fetchOffer = createAsyncThunk(
  'offer/fetchOffer',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const result = await getOfferDetails(orderId);
      return result;
    } catch (err) {
      if (isErrorMsg(err)) return rejectWithValue(err.message);
      return err;
    }
  }
);

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setFreeOffer(state, { payload }) {
      state.isOfferFree = payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchOffer.pending, state => {
      state.loading = true;
    }),
      builder.addCase(fetchOffer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.offer = payload;
      }),
      builder.addCase(fetchOffer.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as typeof initialState['error'];
      });
  }
});

export const { setFreeOffer } = offerSlice.actions;
export default offerSlice.reducer;
