import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOffers } from 'api';

const initialState = {
  offers: [],
  pauseOffers: [],
  pauseOffersIDs: [],
  loading: false,
  error: null
};

export const fetchOffers = createAsyncThunk(
  'offers/fetchOffers',
  async (arg, { rejectWithValue }) => {
    try {
      const result = await getOffers();
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  extraReducers: {
    [fetchOffers.pending]: (state) => {
      state.loading = true;
    },
    [fetchOffers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.offers = payload;
      state.pauseOffers = payload.filter(
        ({ externalProperties }) => externalProperties.PAUSE_OFFER === 'true'
      );
      state.pauseOffersIDs = payload
        .filter(
          ({ externalProperties }) => externalProperties.PAUSE_OFFER === 'true'
        )
        .map((item) => item.longId);
    },
    [fetchOffers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export const selectOffers = (state) => state.offers;

export default offersSlice.reducer;
