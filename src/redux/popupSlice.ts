import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

export const POPUP_TYPES = {
  UPDATE_SUBSCRIPTION_POPUP: 'updateSubscription',
  SWITCH_PLAN_POPUP: 'switchPlan',
  PAUSE_SUBSCRIPTION_POPUP: 'pauseSubscription',
  RESUME_SUBSCRIPTION_POPUP: 'resumeSubscription',
  CANCEL_SWITCH_POPUP: 'cancelSwitch',
  CANCEL_PAUSE_POPUP: 'cancelPause'
} as const;

type PopupTypesKeys = keyof typeof POPUP_TYPES;
type PopupTypes = typeof POPUP_TYPES[PopupTypesKeys];

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

type Offer = {
  subscriptionId: number;
  offerId: string;
  status: string;
  startedAt: number;
  expiresAt: number;
  nextPaymentPrice: number;
  nextPaymentCurrency: string;
  nextPaymentAt: number;
  paymentGateway: string;
  paymentMethod: string;
  externalPaymentId: string;
  inTrial: boolean;
  pendingSwitchId: string;
  offerType: string;
  offerTitle: string;
  period: string;
  totalPrice: number;
};

type SwitchSettings = {
  toOfferId: string;
  algorithm: string;
  switchDirection: string;
  title: string;
  price: number;
  currency: string;
  currencySymbol: string;
  period: string;
  nextPaymentPrice: number;
  nextPaymentPriceCurrency: string;
  nextPaymentPriceCurrencySymbol: string;
};

type UpdateSubscription = {
  action: string;
  offerData: Offer;
};

type SwitchPlan = {
  offerData: SwitchSettings;
  isPartOfCancellationFlow?: boolean;
};

type PauseSubscription = {
  offerData: SwitchSettings;
  isPartOfCancellationFlow?: boolean;
};

type CancelSwitch = {
  pendingSwitchId: string;
  switchDirection: string;
  baseOfferTitle: string;
  baseOfferExpirationDate: string;
  baseOfferPrice: string;
};

type CancelPause = {
  pendingSwitchId: string;
  switchDirection: string;
  baseOfferTitle: string;
  baseOfferExpirationDate: string;
  baseOfferPrice: string;
};

type ResumeSubscription = {
  offerData: SwitchSettings;
};

type PopupManager = {
  isOpen: boolean;
  isLoading: boolean;
  currentType: PopupTypes | null;
  updateSubscription: UpdateSubscription | null;
  switchPlan: SwitchPlan | null;
  pauseSubscription: PauseSubscription | null;
  cancelSwitch: CancelSwitch | null;
  cancelPause: CancelPause | null;
  resumeSubscription: ResumeSubscription | null;
  paymentDetails: PaymentDetails;
};

type PopupType = {
  type: PopupTypes;
};

type PopupData = {
  data:
    | UpdateSubscription
    | SwitchPlan
    | PauseSubscription
    | CancelSwitch
    | CancelPause
    | ResumeSubscription;
};

const initialState: PopupManager = {
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
    updatePaymentDetailsPopup(
      state,
      action: PayloadAction<IsOpen | IsLoading | Step>
    ) {
      state.paymentDetails = {
        ...state.paymentDetails,
        ...action.payload
      };
    },
    resetPaymentDetailsPopupState(state) {
      state.paymentDetails = initialState.paymentDetails;
    },
    showPopup(state, action: PayloadAction<PopupType & PopupData>) {
      if (state.currentType) {
        state[state.currentType] = initialState[state.currentType];
        state.currentType = null;
      }
      state.isOpen = true;
      state.currentType = action.payload.type;
      state[action.payload.type] = action.payload.data;
    },
    hidePopup: () => initialState
  }
});

export const selectPaymentDetailsPopup = (state: RootState) =>
  state.popupManager.paymentDetails;

export const selectPopupDetails = (state: RootState) => ({
  isOpen: state.popupManager.isOpen,
  isLoading: state.popupManager.isLoading,
  currentType: state.popupManager.currentType
});

export const {
  updatePaymentDetailsPopup,
  resetPaymentDetailsPopupState,
  showPopup,
  hidePopup
} = popupSlice.actions;

export default popupSlice.reducer;
