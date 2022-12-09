import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOfferDetails } from '../api';

const initialState = {
  offer: null,
  loading: false,
  error: null,
  isOfferFree: false
};

export const fetchOffer = createAsyncThunk(
  'offer/fetchOffer',
  async (orderId, { rejectWithValue }) => {
    try {
      return getOfferDetails(orderId);
    } catch (err) {
      return rejectWithValue(err.message);
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
  extraReducers: {
    [fetchOffer.pending]: state => {
      state.loading = true;
    },
    [fetchOffer.fulfilled]: (state, { payload }) => {
      if (payload.errors.length) {
        state.error = payload.errors[0];
      } else {
        state.offer = payload.responseData;
      }
    },
    [fetchOffer.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export const { setFreeOffer } = offerSlice.actions;
export default offerSlice.reducer;
