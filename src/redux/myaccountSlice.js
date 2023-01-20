import { createSlice } from '@reduxjs/toolkit';

const TABS = {
  PLAN_DETAILS: 'PLAN_DETAILS',
  YOUR_PAYMENTS: 'YOUR_PAYMENTS',
  USER_PROFILE: 'USER_PROFILE'
};

const initialState = {
  activeTab: TABS.PLAN_DETAILS
};

export const myaccountSlice = createSlice({
  name: 'myaccount',
  initialState,
  reducers: {
    setActiveTab(state, { payload }) {
      state.activeTab = payload;
    }
  },
  extraReducers: {}
});

export const { setActiveTab } = myaccountSlice.actions;

export default myaccountSlice.reducer;
