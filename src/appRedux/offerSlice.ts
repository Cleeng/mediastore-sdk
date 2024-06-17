import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferV2 } from 'types/OfferV2.types';
import { RootState } from './rootReducer';
import { getOfferDetails, getOffer } from '../api';
import { Offer, OfferInitialState } from './types';

const initialState: OfferInitialState = {
  offer: {},
  offerV2: {},
  loading: false,
  error: null,
  isOfferFree: false
};

export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  {
    rejectValue: string;
  }
>('offer/fetchOffer', async (orderId, { rejectWithValue }) => {
  try {
    const result = await getOfferDetails(orderId);
    return result as Offer;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const fetchOfferV2 = createAsyncThunk<
  OfferV2,
  string,
  {
    rejectValue: string;
  }
>('offer/fetchOfferV2', async (orderId, { rejectWithValue }) => {
  try {
    const result = await getOffer(orderId);
    return result as OfferV2;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: (create) => ({
    setFreeOffer: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isOfferFree = action.payload;
    })
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOffer.fulfilled, (state, action) => {
      state.loading = false;
      state.offer = action.payload;
    });
    builder.addCase(fetchOffer.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
    builder.addCase(fetchOfferV2.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOfferV2.fulfilled, (state, action) => {
      state.loading = false;
      state.offerV2 = action.payload;
    });
    builder.addCase(fetchOfferV2.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
  }
});

export const selectOffer = (state: RootState) => state.offer;
export const selectOnlyOffer = (state: RootState) => state.offer.offer;

export const { setFreeOffer } = offerSlice.actions;
export default offerSlice.reducer;
