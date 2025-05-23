import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import {
  PopupManagerInitialState,
  updatePaymentDetailsPopupPayloadAction,
  PopupType,
  PopupData
} from './types';

export const POPUP_TYPES = {
  UPDATE_SUBSCRIPTION_POPUP: 'updateSubscription',
  SWITCH_PLAN_POPUP: 'switchPlan',
  RESUME_SUBSCRIPTION_POPUP: 'resumeSubscription',
  CANCEL_SWITCH_POPUP: 'cancelSwitch',
  EDIT_DELIVERY_DETAILS_POPUP: 'editDeliveryDetails',
  EDIT_PASSWORD: 'editPassword'
} as const;

export const PAYMENT_DETAILS_STEPS = {
  PAYMENT_DETAILS_UPDATE: 'PAYMENT_DETAILS_UPDATE',
  DELETE_PAYMENT_DETAILS: 'DELETE_PAYMENT_DETAILS',
  FINALIZE_ADYEN: 'FINALIZE_ADYEN',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
} as const;

export const initialState: PopupManagerInitialState = {
  isOpen: false,
  isLoading: false,
  currentType: null,
  updateSubscription: null,
  switchPlan: null,
  cancelSwitch: null,
  resumeSubscription: null,
  editDeliveryDetails: {
    giftId: null,
    offerId: '',
    offerTitle: ''
  },
  paymentDetails: {
    isOpen: false,
    isLoading: false,
    step: PAYMENT_DETAILS_STEPS.PAYMENT_DETAILS_UPDATE,
    initPaymentMethod: null
  }
};

export const popupSlice = createSlice({
  name: 'popupManager',
  initialState,
  reducers: (create) => ({
    updatePaymentDetailsPopup: create.reducer(
      (
        state,
        action: PayloadAction<updatePaymentDetailsPopupPayloadAction>
      ) => {
        state.paymentDetails = {
          ...state.paymentDetails,
          ...action.payload
        };
      }
    ),
    resetPaymentDetailsPopupState: create.reducer((state) => {
      state.paymentDetails = initialState.paymentDetails;
    }),
    showPopup: create.reducer(
      (state, action: PayloadAction<PopupType & PopupData>) => {
        if (state.currentType) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          state[state.currentType] = initialState[state.currentType];
          state.currentType = null;
        }

        state.isOpen = true;
        state.currentType = action.payload.type;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state[action.payload.type] = action.payload.data;
      }
    ),
    hidePopup: create.reducer(() => initialState)
  })
});

export const selectPaymentDetailsPopup = (state: RootState) =>
  state.popupManager.paymentDetails;

export const selectEditDeliveryDetailsPopup = (state: RootState) =>
  state.popupManager.editDeliveryDetails;

export const selectPopupDetails = (state: RootState) => ({
  isOpen: state.popupManager.isOpen,
  isLoading: state.popupManager.isLoading,
  currentType: state.popupManager.currentType
});

export const selectOfferData = (state: RootState) =>
  state.popupManager.updateSubscription?.offerData;

export const selectPopupManager = (state: RootState) => state.popupManager;

export const {
  updatePaymentDetailsPopup,
  resetPaymentDetailsPopupState,
  showPopup,
  hidePopup
} = popupSlice.actions;

export default popupSlice.reducer;
