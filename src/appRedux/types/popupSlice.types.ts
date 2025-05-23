import { PaymentDetail } from 'api/Customer/types';
import { PAYMENT_DETAILS_STEPS, POPUP_TYPES } from '../popupSlice';

type Keys = keyof typeof PAYMENT_DETAILS_STEPS;
type Steps = (typeof PAYMENT_DETAILS_STEPS)[Keys];

type PopupTypesKeys = keyof typeof POPUP_TYPES;
type PopupTypes = (typeof POPUP_TYPES)[PopupTypesKeys];

export type PaymentDetails = {
  isOpen: boolean;
  isLoading: boolean;
  step: Steps;
  initPaymentMethod: PaymentDetail | null;
  errorMessage?: string;
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

export type SubscriptionOffer = {
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

export type UpdateSubscription = {
  action: string;
  offerData: SubscriptionOffer;
};

type SwitchPlan = {
  offerData: SwitchSettings;
  isPartOfCancellationFlow?: boolean;
};

type CancelSwitch = {
  pendingSwitchId: string;
  switchDirection: string;
  switchOfferTitle: string;
  baseOfferTitle: string;
  baseOfferExpirationDate: number;
  baseOfferPrice: string;
};

type ResumeSubscription = {
  offerData: SwitchSettings;
};

type EditDeliveryDetails = {
  giftId: number | null;
  offerId: string;
  offerTitle: string;
};

export type PopupManagerInitialState = {
  isOpen: boolean;
  isLoading: boolean;
  currentType: PopupTypes | null;
  updateSubscription: UpdateSubscription | null;
  switchPlan: SwitchPlan | null;
  cancelSwitch: CancelSwitch | null;
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
    | CancelSwitch
    | ResumeSubscription
    | EditDeliveryDetails;
};

export type updatePaymentDetailsPopupPayloadAction =
  | IsOpen
  | IsLoading
  | Step
  | InitPaymentMethod;
