import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOfferDetails } from '../api';
import { isErrorMsg } from 'util/reduxValidation';

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
  expiresAt: unknown;
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
  startTime: unknown;
  timeZone: unknown;
  trialAvailable: boolean;
  updatedAt: number;
  videoId: unknown;
}

type InitialState = {
  offer: Offer | {};
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
    setFreeOffer(state, { payload }) {
      state.isOfferFree = payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchOffer.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchOffer.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.offer = payload;
    });
    builder.addCase(fetchOffer.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as typeof initialState['error'];
    });
  }
});

export const { setFreeOffer } = offerSlice.actions;
export default offerSlice.reducer;
