import { PaymentDetail } from 'api/Customer/types';
import { PAYMENT_DETAILS_STEPS, POPUP_TYPES } from '../popupSlice';

type Keys = keyof typeof PAYMENT_DETAILS_STEPS;
type Steps = typeof PAYMENT_DETAILS_STEPS[Keys];

type PopupTypesKeys = keyof typeof POPUP_TYPES;
type PopupTypes = typeof POPUP_TYPES[PopupTypesKeys];

type PaymentDetails = {
  isOpen: boolean;
  isLoading: boolean;
  step: Steps;
  initPaymentMethod: PaymentDetail | null;
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

type InitPaymentMethod = { initPaymentMethod: PaymentDetail | null };

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

type EditDeliveryDetails = {
  giftId: string;
  offerId: string;
  offerTitle: string;
};

export type PopupManagerInitialState = {
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
  editDeliveryDetails: EditDeliveryDetails;
};

export type PopupType = {
  type: PopupTypes;
};

export type PopupData = {
  data:
    | UpdateSubscription
    | SwitchPlan
    | PauseSubscription
    | CancelSwitch
    | CancelPause
    | ResumeSubscription
    | EditDeliveryDetails;
};

export type updatePaymentDetailsPopupPayloadAction =
  | IsOpen
  | IsLoading
  | Step
  | InitPaymentMethod;
