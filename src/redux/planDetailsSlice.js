import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCustomerOffers,
  getSwitchRefactored, // in future no refactored
  getAvailableSwitchesRefactored // in future no refactored
} from '../api';

const initialState = {
  // maybe we can do null as a initial values
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
    error: null
  },
  switchDetails: {
    data: {},
    loading: false,
    error: null
  }
};

export const fetchCustomerOffers = createAsyncThunk(
  'plan/fetchCustomerOffers',
  async (_, { rejectWithValue }) => {
    try {
      const { items } = await getCustomerOffers();
      const customerOffers = items.filter(
        offer =>
          !(offer.offerType === 'P' && offer.expiresAt * 1000 < Date.now())
      );
      return customerOffers;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPendingSwitches = createAsyncThunk(
  'plan/fetchPendingSwitches',
  async (subsWithPendingSwitches, { rejectWithValue }) => {
    try {
      const switchesList = await Promise.all(
        subsWithPendingSwitches.map(async ({ pendingSwitchId }) => {
          const switchDetails = await getSwitchRefactored(pendingSwitchId);
          return switchDetails;
        })
      );
      const switchesObj = switchesList.reduce(
        (acc, current) => ({ ...acc, [current.id]: current }),
        {}
      );
      return switchesObj;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const fetchAvailableSwitches = createAsyncThunk(
  'plan/fetchAvailableSwitches',
  async (subscriptions, { rejectWithValue }) => {
    try {
      const availableSwitchesList = await Promise.all(
        subscriptions.map(async ({ offerId }) => {
          const switches = await getAvailableSwitchesRefactored(offerId);
          return { offerId, switches };
        })
      );
      const availableSwitchesObj = availableSwitchesList.reduce(
        (acc, current) => ({ ...acc, [current.offerId]: current.switches }),
        {}
      );
      return availableSwitchesObj;
    } catch (err) {
      rejectWithValue(err.message);
    }
  }
);

export const planDetailsSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setOfferToSwitch(state, { payload }) {
      state.offerToSwitch = payload;
    },
    updateList(state, { payload }) {
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
  extraReducers: {
    [fetchCustomerOffers.pending]: state => {
      state.currentPlan.loading = true;
    },
    [fetchCustomerOffers.fulfilled]: (state, { payload }) => {
      state.currentPlan.loading = false;
      state.currentPlan.data = payload;
    },
    [fetchCustomerOffers.rejected]: (state, { payload }) => {
      state.currentPlan.loading = false;
      state.currentPlan.error = payload;
    },
    [fetchPendingSwitches.pending]: state => {
      state.switchDetails.loading = true;
    },
    [fetchPendingSwitches.fulfilled]: (state, { payload }) => {
      state.switchDetails.loading = false;
      state.switchDetails.data = payload;
    },
    [fetchPendingSwitches.rejected]: (state, { payload }) => {
      state.switchDetails.loading = false;
      state.switchDetails.error = payload;
    },
    [fetchAvailableSwitches.pending]: state => {
      state.switchSettings.loading = true;
    },
    [fetchAvailableSwitches.fulfilled]: (state, { payload }) => {
      state.switchSettings.loading = false;
      state.switchSettings.data = payload;
    },
    [fetchAvailableSwitches.rejected]: (state, { payload }) => {
      state.switchSettings.loading = false;
      state.switchSettings.error = payload;
    }
  }
});

export const {
  setOfferToSwitch,
  updateList,
  setSwitchDetails
} = planDetailsSlice.actions;

export default planDetailsSlice.reducer;
