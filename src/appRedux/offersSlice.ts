import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOffers } from 'api';
import OfferV2 from 'types/OfferV2.types';
import { RootState } from './rootReducer';
import { OffersInitialState } from './types';

const initialState: OffersInitialState = {
  offers: [],
  pauseOffers: [],
  pauseOffersIDs: [],
  loading: false,
  error: null
};

export const fetchOffers = createAsyncThunk<
  OfferV2[],
  void,
  {
    rejectValue: string;
  }
>('offers/fetchOffers', async (_, { rejectWithValue }) => {
  try {
    const result = await getOffers();
    return result;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: () => ({}),
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOffers.fulfilled, (state, { payload }) => {
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
    });
    builder.addCase(fetchOffers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  }
});

export const selectOffers = (state: RootState) => state.offers;

export default offersSlice.reducer;
