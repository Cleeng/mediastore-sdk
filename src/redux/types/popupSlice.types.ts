import { PAYMENT_DETAILS_STEPS } from '../popupSlice';

type Keys = keyof typeof PAYMENT_DETAILS_STEPS;
type Steps = typeof PAYMENT_DETAILS_STEPS[Keys];

export type PaymentDetails = {
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

export type PopupManagerInitialState = {
  paymentDetails: PaymentDetails;
};

export type updatePaymentDetailsPopupPayloadAction = IsOpen | IsLoading | Step;
