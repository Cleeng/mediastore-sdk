import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { CustomerOffer } from '../api/Customer/types';
import {
  PlanDetailsInitialState,
  RejectValueError,
  SwitchDetails
} from './types';
import { getCustomerOffers, getSwitch, getAvailableSwitches } from '../api';

const initialState: PlanDetailsInitialState = {
  currentPlan: {
    data: [],
    loading: false,
    error: []
  },
  offerToSwitch: {},
  updateList: false,
  switchSettings: {
    data: {},
    loading: false,
    error: []
  },
  switchDetails: {
    data: {},
    loading: false,
    error: []
  }
};

export const fetchCustomerOffers = createAsyncThunk<
  CustomerOffer[],
  void,
  {
    rejectValue: RejectValueError;
  }
>('plan/fetchCustomerOffers', async (_, { rejectWithValue }) => {
  try {
    const { items } = await getCustomerOffers();
    const customerOffers = items.filter(
      offer => !(offer.offerType === 'P' && offer.expiresAt * 1000 < Date.now())
    );
    return customerOffers;
  } catch (err) {
    return rejectWithValue(err as RejectValueError);
  }
});

export const fetchPendingSwitches = createAsyncThunk<
  SwitchDetails,
  CustomerOffer[],
  {
    rejectValue: RejectValueError;
  }
>(
  'plan/fetchPendingSwitches',
  async (subsWithPendingSwitches, { rejectWithValue }) => {
    try {
      const switchesList = await Promise.all(
        subsWithPendingSwitches.map(async ({ pendingSwitchId }) => {
          const switchDetails = await getSwitch(pendingSwitchId);
          return switchDetails;
        })
      );
      const switchesObj = switchesList.reduce(
        (acc, current) => ({ ...acc, [current.id]: current }),
        {}
      );
      return switchesObj;
    } catch (err) {
      rejectWithValue(err as RejectValueError);
    }
  }
);

export const fetchAvailableSwitches = createAsyncThunk<
  any, // should be SwitchSettings but for some reason its invalid
  CustomerOffer[],
  {
    rejectValue: RejectValueError;
  }
>('plan/fetchAvailableSwitches', async (subscriptions, { rejectWithValue }) => {
  try {
    const availableSwitchesList = await Promise.all(
      subscriptions.map(async ({ offerId }) => {
        const switches = await getAvailableSwitches(offerId);
        return { offerId, switches };
      })
    );
    const availableSwitchesObj = availableSwitchesList.reduce(
      (acc, current) => ({
        ...acc,
        [current.offerId]: current.switches
      }),
      {}
    );
    return availableSwitchesObj;
  } catch (err) {
    rejectWithValue(err as RejectValueError);
  }
});

export const planDetailsSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setOfferToSwitch(state, { payload }) {
      state.offerToSwitch = payload;
    },
    resetOfferToSwitch(state) {
      state.offerToSwitch = initialState.offerToSwitch;
    },
    updateList(state) {
      state.updateList = !state.updateList;
    },
    setSwitchDetails(state, { payload }) {
      const { details, type } = payload;
      if (type === 'delete') {
        delete state.switchDetails.data[details.pendingSwitchId];
      } else {
        state.switchDetails.data = Object.assign(
          state.switchDetails.data,
          details
        );
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCustomerOffers.pending, state => {
      state.currentPlan.loading = true;
    });
    builder.addCase(fetchCustomerOffers.fulfilled, (state, action) => {
      state.currentPlan.loading = false;
      state.currentPlan.data = action.payload;
    });
    builder.addCase(fetchCustomerOffers.rejected, (state, action) => {
      state.currentPlan.loading = false;
      state.currentPlan.error = action.payload?.message;
    });
    builder.addCase(fetchPendingSwitches.pending, state => {
      state.switchDetails.loading = true;
    });
    builder.addCase(fetchPendingSwitches.fulfilled, (state, action) => {
      state.switchDetails.loading = false;
      state.switchDetails.data = action.payload;
    });
    builder.addCase(fetchPendingSwitches.rejected, (state, action) => {
      state.switchDetails.loading = false;
      state.switchDetails.error = action.payload?.message;
    });
    builder.addCase(fetchAvailableSwitches.pending, state => {
      state.switchSettings.loading = true;
    });
    builder.addCase(fetchAvailableSwitches.fulfilled, (state, action) => {
      state.switchSettings.loading = false;
      state.switchSettings.data = action.payload;
    });
    builder.addCase(fetchAvailableSwitches.rejected, (state, action) => {
      state.switchSettings.loading = false;
      state.switchSettings.error = action.payload?.message;
    });
  }
});

export const selectPlanDetails = (state: RootState) => state.plan;

export const selectCurrentPlan = (state: RootState) => state.plan.currentPlan;

export const {
  setOfferToSwitch,
  resetOfferToSwitch,
  updateList,
  setSwitchDetails
} = planDetailsSlice.actions;

export default planDetailsSlice.reducer;