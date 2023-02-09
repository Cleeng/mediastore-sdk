import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOffers } from 'api';

const initialState = {
  offers: [],
  pauseOffers: [],
  pauseOfferIDs: [],
  loading: false,
  error: null
};

export const fetchOffers = createAsyncThunk(
  'offers/fetchOffers',
  async thunkAPI => {
    try {
      const result = await getOffers();
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  extraReducers: {
    [fetchOffers.pending]: state => {
      state.loading = true;
    },
    [fetchOffers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.offers = payload;
      state.pauseOffers = Array.isArray(payload)
        ? payload.filter(
            offer => offer.externalProperties.PAUSE_OFFER === 'true'
          )
        : [];
      state.pauseOfferIDs = Array.isArray(payload)
        ? payload
            .filter(offer => offer.externalProperties.PAUSE_OFFER === 'true')
            .map(item => item.longId)
        : [];
    },
    [fetchOffers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export default offersSlice.reducer;
