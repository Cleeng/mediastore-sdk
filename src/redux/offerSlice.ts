import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { getOfferDetails } from '../api';
import { Offer, OfferInitialState, RejectValueError } from './types';

const initialState: OfferInitialState = {
  offer: {},
  loading: false,
  error: null,
  isOfferFree: false
};

export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  {
    rejectValue: RejectValueError;
  }
>('offer/fetchOffer', async (orderId, { rejectWithValue }) => {
  try {
    const result = await getOfferDetails(orderId);
    return result as Offer;
  } catch (err) {
    return rejectWithValue(err as RejectValueError);
  }
});

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setFreeOffer(state, action: PayloadAction<boolean>) {
      state.isOfferFree = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchOffer.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchOffer.fulfilled, (state, action) => {
      state.loading = false;
      state.offer = action.payload;
    });
    builder.addCase(fetchOffer.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  }
});

export const selectOffer = (state: RootState) => state.offer;
export const selectOnlyOffer = (state: RootState) => state.offer.offer;

export const { setFreeOffer } = offerSlice.actions;
export default offerSlice.reducer;
