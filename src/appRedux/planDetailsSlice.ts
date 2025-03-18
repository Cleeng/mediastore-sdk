import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import { CustomerOffer } from '../api/Customer/types';
import { PlanDetailsInitialState, SwitchDetails } from './types';
import { getCustomerOffers, getSwitch, getAvailableSwitches } from '../api';

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
  pendingSwitchDetails: {
    data: {},
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
    setPendingSwitchDetails: create.reducer(
      (state, { payload }: PayloadAction<SwitchDetailChangeAction>) => {
        const { details, type } = payload;

        if (type === 'delete') {
          delete state.pendingSwitchDetails.data[details.pendingSwitchId];
        } else {
          state.pendingSwitchDetails.data = Object.assign(
            state.pendingSwitchDetails.data,
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
      state.pendingSwitchDetails.loading = true;
    });
    builder.addCase(fetchPendingSwitches.fulfilled, (state, action) => {
      state.pendingSwitchDetails.loading = false;
      state.pendingSwitchDetails.data = action.payload;
    });
    builder.addCase(fetchPendingSwitches.rejected, (state, action) => {
      state.pendingSwitchDetails.loading = false;
      state.pendingSwitchDetails.error = action.payload;
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
  }
});

export const selectPlanDetails = (state: RootState) => state.plan;

export const selectCurrentPlan = (state: RootState) => state.plan.currentPlan;

export const selectSwitchSettings = (state: RootState) =>
  state.plan.switchSettings;

export const selectPendingSwitchDetails = (state: RootState) =>
  state.plan.pendingSwitchDetails;

export const selectCurrentPlanDetails = (state: RootState) =>
  state.plan.currentPlan;

export const {
  setOfferToSwitch,
  resetOfferToSwitch,
  updateList,
  setPendingSwitchDetails
} = planDetailsSlice.actions;

export default planDetailsSlice.reducer;
