import { createSlice } from '@reduxjs/toolkit';

export const PAYMENT_DETAILS_STEPS = {
  PAYMENT_DETAILS_UPDATE: 'PAYMENT_DETAILS_UPDATE',
  DELETE_PAYMENT_DETAILS: 'DELETE_PAYMENT_DETAILS',
  FINALIZE_ADYEN: 'FINALIZE_ADYEN',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

const initialState = {
  isOpen: false,
  isLoading: false,
  currentType: null,
  updateSubscription: null,
  switchPlan: null,
  pauseSubscription: null,
  cancelSwitch: null,
  cancelPause: null,
  resumeSubscription: null,
  paymentDetails: {
    isOpen: false,
    isLoading: false,
    step: PAYMENT_DETAILS_STEPS.PAYMENT_DETAILS_UPDATE
  }
};

export const popupSlice = createSlice({
  name: 'popupManager',
  initialState,
  reducers: {
    updatePaymentDetailsPopup(state, { payload }) {
      state.paymentDetails = { ...state.paymentDetails, ...payload };
    },
    resetPaymentDetailsPopupState(state) {
      state.paymentDetails = initialState.paymentDetails;
    },
    showPopup(state, { payload }) {
      if (state.currentType) {
        state[state.currentType] = initialState[state.currentType];
        state.currentType = null;
      }
      state.isOpen = true;
      state.currentType = payload.type;
      state[payload.type] = payload.data;
    },
    hidePopup(state, { payload }) {
      state.isOpen = false;
      state.currentType = null;
      state[payload.type] = initialState[payload.type];
    }
  },
  extraReducers: {}
});

export const {
  updatePaymentDetailsPopup,
  resetPaymentDetailsPopupState,
  showPopup,
  hidePopup
} = popupSlice.actions;

export default popupSlice.reducer;
