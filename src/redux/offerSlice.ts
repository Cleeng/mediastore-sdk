import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import isErrorMsg from 'util/reduxValidation';
import { RootState } from './rootReducer';
import { getOfferDetails } from '../api';

type Offer = {
  accessToTags: string[];
  active: boolean;
  applicableTaxRate: number;
  applyServiceFeeOnCustomer: boolean;
  averageRating: number;
  contentAgeRestriction: unknown;
  contentExternalData: unknown;
  contentExternalId: unknown;
  contentType: unknown;
  createdAt: number;
  customerCountry: string;
  customerCurrency: string;
  customerCurrencySymbol: string;
  customerPriceExclTax: number;
  customerPriceInclTax: number;
  discountPeriods: unknown;
  discountedCustomerPriceExclTax: unknown;
  discountedCustomerPriceInclTax: unknown;
  endTime: unknown;
  expiresAt: number;
  freeDays: number;
  freePeriods: number;
  geoRestrictionCountries: unknown[];
  geoRestrictionEnabled: boolean;
  geoRestrictionType: unknown;
  offerCountry: string;
  offerCurrency: string;
  offerCurrencySymbol: string;
  offerDescription: unknown;
  offerId: string;
  offerPrice: number;
  offerTitle: string;
  offerUrl: unknown;
  period: string;
  socialCommissionRate: number;
  startTime: number;
  timeZone: unknown;
  trialAvailable: boolean;
  updatedAt: number;
  videoId: unknown;
};

type InitialState = {
  offer: Offer | Record<string, never>;
  loading: boolean;
  error: string | null;
  isOfferFree: boolean;
};

const initialState: InitialState = {
  offer: {},
  loading: false,
  error: null,
  isOfferFree: false
};

export const fetchOffer = createAsyncThunk(
  'offer/fetchOffer',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const result = await getOfferDetails(orderId);
      return result as Offer;
    } catch (err) {
      if (isErrorMsg(err)) return rejectWithValue(err.message);
      return rejectWithValue(err);
    }
  }
);

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
    builder.addCase(
      fetchOffer.fulfilled,
      (state, action: PayloadAction<Offer>) => {
        state.loading = false;
        state.offer = action.payload;
      }
    );
    builder.addCase(fetchOffer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as typeof initialState['error'];
    });
  }
});

export const selectOffer = (state: RootState) => state.offer;
export const selectOnlyOffer = (state: RootState) => state.offer.offer;

export const { setFreeOffer } = offerSlice.actions;
export default offerSlice.reducer;
