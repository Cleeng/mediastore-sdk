import { createSlice } from '@reduxjs/toolkit';

export const MYACCCOUNT_TABS = {
  planDetails: 'planDetails',
  paymentInfo: 'paymentInfo',
  updateProfile: 'updateProfile'
};

const initialState = {
  activeTab: MYACCCOUNT_TABS.planDetails
};

export const myaccountSlice = createSlice({
  name: 'myaccount',
  initialState,
  reducers: (create) => ({
    setActiveTab: create.reducer((state, { payload }) => {
      state.activeTab = payload;
    })
  })
});

export const { setActiveTab } = myaccountSlice.actions;

export default myaccountSlice.reducer;
