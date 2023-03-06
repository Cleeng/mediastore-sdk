import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const PAYMENT_DETAILS_STEPS = {
  PAYMENT_DETAILS_UPDATE: 'PAYMENT_DETAILS_UPDATE',
  DELETE_PAYMENT_DETAILS: 'DELETE_PAYMENT_DETAILS',
  FINALIZE_ADYEN: 'FINALIZE_ADYEN',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
} as const;

type Keys = keyof typeof PAYMENT_DETAILS_STEPS;
type Steps = typeof PAYMENT_DETAILS_STEPS[Keys];

type PaymentDetails = {
  isOpen: boolean;
  isLoading: boolean;
  step: Steps;
};

type IsOpen = {
  isOpen: boolean;
};

type IsLoading = {
  isLoading: boolean;
};

type Step = {
  step: Steps;
};

type PopupManager = {
  paymentDetails: PaymentDetails;
};

const initialState: PopupManager = {
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
    updatePaymentDetailsPopup(
      state,
      action: PayloadAction<IsOpen | IsLoading | Step>
    ) {
      state.paymentDetails = { ...state.paymentDetails, ...action.payload };
    },
    resetPaymentDetailsPopupState(state) {
      state.paymentDetails = initialState.paymentDetails;
    }
  }
});

export const {
  updatePaymentDetailsPopup,
  resetPaymentDetailsPopupState
} = popupSlice.actions;

export default popupSlice.reducer;
