import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SwitchDetail, PlanDetailsInitialState, SwitchDetails } from './types';
import { RootState } from './rootReducer';
import { CustomerOffer } from '../api/Customer/types';
import {
  getCustomerOffers,
  getSwitch,
  getAvailableSwitches,
  getCustomerSwitchesHistory
} from '../api';

type SwitchDetailChangeAction = {
  type: string;
  details: {
    pendingSwitchId: string;
  };
};

const initialState: PlanDetailsInitialState = {
  currentPlan: {
    data: [],
    loading: false,
    error: null
  },
  offerToSwitch: {},
  updateList: false,
  switchSettings: {
    data: {},
    loading: false,
    error: null
  },
  pendingSwitchesDetails: {
    data: {},
    loading: false,
    error: null
  },
  customerSwitchesHistory: {
    data: [],
    loading: false,
    error: null
  }
};

export const fetchCustomerOffers = createAsyncThunk<
  CustomerOffer[],
  void,
  {
    rejectValue: string;
  }
>('plan/fetchCustomerOffers', async (_, { rejectWithValue }) => {
  try {
    const { items } = await getCustomerOffers();
    return items;
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const fetchPendingSwitches = createAsyncThunk<
  SwitchDetails,
  CustomerOffer[],
  {
    rejectValue: string;
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
      const typedError = err as Error;
      return rejectWithValue(typedError.message);
    }
  }
);

export const fetchCustomerSwitchesHistory = createAsyncThunk<
  SwitchDetail[],
  void,
  {
    rejectValue: string;
  }
>('plan/fetchCustomerSwitchesHistory', async (_, { rejectWithValue }) => {
  try {
    return await getCustomerSwitchesHistory();
  } catch (err) {
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const fetchAvailableSwitches = createAsyncThunk<
  any, // should be SwitchSettings but for some reason its invalid
  CustomerOffer[],
  {
    rejectValue: string;
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
    const typedError = err as Error;
    return rejectWithValue(typedError.message);
  }
});

export const planDetailsSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: (create) => ({
    setOfferToSwitch: create.reducer(
      (state, { payload }: PayloadAction<CustomerOffer>) => {
        state.offerToSwitch = payload;
      }
    ),
    resetOfferToSwitch: create.reducer((state) => {
      state.offerToSwitch = initialState.offerToSwitch;
    }),
    updateList: create.reducer((state) => {
      state.updateList = !state.updateList;
    }),
    setPendingSwitchesDetails: create.reducer(
      (state, { payload }: PayloadAction<SwitchDetailChangeAction>) => {
        const { details, type } = payload;

        if (type === 'delete') {
          delete state.pendingSwitchesDetails.data[details.pendingSwitchId];
        } else {
          state.pendingSwitchesDetails.data = Object.assign(
            state.pendingSwitchesDetails.data,
            details
          );
        }
      }
    )
  }),
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerOffers.pending, (state) => {
      state.currentPlan.loading = true;
    });
    builder.addCase(fetchCustomerOffers.fulfilled, (state, action) => {
      state.currentPlan.loading = false;
      state.currentPlan.data = action.payload;
    });
    builder.addCase(fetchCustomerOffers.rejected, (state, action) => {
      state.currentPlan.loading = false;
      state.currentPlan.error = action.payload;
    });
    builder.addCase(fetchPendingSwitches.pending, (state) => {
      state.pendingSwitchesDetails.loading = true;
    });
    builder.addCase(fetchPendingSwitches.fulfilled, (state, action) => {
      state.pendingSwitchesDetails.loading = false;
      state.pendingSwitchesDetails.data = action.payload;
    });
    builder.addCase(fetchPendingSwitches.rejected, (state, action) => {
      state.pendingSwitchesDetails.loading = false;
      state.pendingSwitchesDetails.error = action.payload;
    });
    builder.addCase(fetchAvailableSwitches.pending, (state) => {
      state.switchSettings.loading = true;
    });
    builder.addCase(fetchAvailableSwitches.fulfilled, (state, action) => {
      state.switchSettings.loading = false;
      state.switchSettings.data = action.payload;
    });
    builder.addCase(fetchAvailableSwitches.rejected, (state, action) => {
      state.switchSettings.loading = false;
      state.switchSettings.error = action.payload;
    });
    builder.addCase(fetchCustomerSwitchesHistory.pending, (state) => {
      state.customerSwitchesHistory.loading = true;
    });
    builder.addCase(fetchCustomerSwitchesHistory.fulfilled, (state, action) => {
      state.customerSwitchesHistory.loading = false;
      state.customerSwitchesHistory.data = action.payload;
    });
    builder.addCase(fetchCustomerSwitchesHistory.rejected, (state, action) => {
      state.customerSwitchesHistory.loading = false;
      state.customerSwitchesHistory.error = action.payload;
    });
  }
});

export const selectPlanDetails = (state: RootState) => state.plan;

export const selectCurrentPlan = (state: RootState) => state.plan.currentPlan;

export const selectSwitchSettings = (state: RootState) =>
  state.plan.switchSettings;

export const selectPendingSwitchesDetails = (state: RootState) =>
  state.plan.pendingSwitchesDetails;

export const selectCurrentPlanDetails = (state: RootState) =>
  state.plan.currentPlan;

export const selectCustomerSwitchesHistory = (state: RootState) =>
  state.plan.customerSwitchesHistory;

export const {
  setOfferToSwitch,
  resetOfferToSwitch,
  updateList,
  setPendingSwitchesDetails
} = planDetailsSlice.actions;

export default planDetailsSlice.reducer;
