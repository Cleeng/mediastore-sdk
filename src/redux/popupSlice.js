import { createSlice } from '@reduxjs/toolkit';

export const PAYMENT_DETAILS_STEPS = {
  PAYMENT_DETAILS_UPDATE: 'PAYMENT_DETAILS_UPDATE',
  DELETE_PAYMENT_DETAILS: 'DELETE_PAYMENT_DETAILS',
  FINALIZE_ADYEN: 'FINALIZE_ADYEN',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

const initialState = {
  global: {
    isOpen: false,
    currentType: null
  },
  paymentDetails: {
    isOpen: false,
    isLoading: false,
    step: PAYMENT_DETAILS_STEPS.PAYMENT_DETAILS_UPDATE
  },
  updateSubscription: {
    isOpen: false,
    isLoading: false,
    data: null
  },
  switchPlan: {
    isOpen: false,
    isLoading: false,
    data: null
  },
  pauseSubscription: {
    isOpen: false,
    isLoading: false,
    data: null
  },
  cancelSwitch: {
    isOpen: false,
    isLoading: false,
    data: null
  },
  cancelPause: {
    isOpen: false,
    isLoading: false,
    data: null
  },
  resumeSubscription: {
    isOpen: false,
    isLoading: false,
    data: null
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
      if (state.global.currentType) {
        state[state.global.currentType].isOpen = false;
        state[state.global.currentType].data =
          initialState[state.global.currentType].data;
        state.global.currentType = null;
      }
      state.global.isOpen = true;
      state.global.currentType = payload.type;
      state[payload.type].isOpen = true;
      state[payload.type].data = payload.data;
    },
    hidePopup(state, { payload }) {
      state.global.isOpen = false;
      state.global.currentType = null;
      state[payload.type].isOpen = false;
      state[payload.type].data = initialState[payload.type].data;
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
