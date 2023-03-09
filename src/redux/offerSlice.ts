import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  error: string | null | undefined;
  isOfferFree: boolean;
};

const initialState: InitialState = {
  offer: {},
  loading: false,
  error: null,
  isOfferFree: false
};

type RejectValueError = {
  message: string;
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
