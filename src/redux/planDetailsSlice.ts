import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCustomerOffers } from '../api';
import { CustomersOffer as CurrentPlan } from '../api/Customer/getCustomerOffers';
import { RootState } from './rootReducer';

type PlanDetails = {
  currentPlan: CurrentPlan[] | null;
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: PlanDetails = {
  currentPlan: null,
  loading: false,
  error: null
};

type RejectValueError = {
  message: string;
};

export const fetchCustomerOffers = createAsyncThunk<
  CurrentPlan[],
  void,
  {
    rejectValue: RejectValueError;
  }
>('plan/fetchCustomerOffers', async (_, { rejectWithValue }) => {
  try {
    const { items } = await getCustomerOffers();
    return items;
  } catch (err) {
    return rejectWithValue(err as RejectValueError);
  }
});

export const planDetailsSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCustomerOffers.pending, state => {
      state.loading = false;
    });
    builder.addCase(fetchCustomerOffers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.currentPlan = payload;
    });
    builder.addCase(fetchCustomerOffers.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  }
});

export const selectCurrentPlan = (state: RootState) => state.plan.currentPlan;

export default planDetailsSlice.reducer;
