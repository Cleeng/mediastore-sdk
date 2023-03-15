import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import {
  PopupManagerInitialState,
  updatePaymentDetailsPopupPayloadAction
} from './types';

export const PAYMENT_DETAILS_STEPS = {
  PAYMENT_DETAILS_UPDATE: 'PAYMENT_DETAILS_UPDATE',
  DELETE_PAYMENT_DETAILS: 'DELETE_PAYMENT_DETAILS',
  FINALIZE_ADYEN: 'FINALIZE_ADYEN',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
} as const;

const initialState: PopupManagerInitialState = {
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
      action: PayloadAction<updatePaymentDetailsPopupPayloadAction>
    ) {
      state.paymentDetails = { ...state.paymentDetails, ...action.payload };
    },
    resetPaymentDetailsPopupState(state) {
      state.paymentDetails = initialState.paymentDetails;
    }
  }
});

export const selectPaymentDetailsPopup = (state: RootState) =>
  state.popupManager.paymentDetails;

export const {
  updatePaymentDetailsPopup,
  resetPaymentDetailsPopupState
} = popupSlice.actions;

export default popupSlice.reducer;
