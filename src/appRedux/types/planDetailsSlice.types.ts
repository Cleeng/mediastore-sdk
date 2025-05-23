import { CustomerOffer } from 'api/Customer/types';

export type SwitchSetting = {
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
  reason?: {
    code: string;
    message: string;
  };
};

export type SwitchSettings = {
  [key: string]: {
    available: SwitchSetting[];
    unavailable: SwitchSetting[];
    unavailableReason?: {
      code: string;
      message: string;
    };
  };
};

export type SwitchDetail = {
  id: string;
  customerId: number;
  direction: string;
  algorithm: string;
  fromOfferId: string;
  toOfferId: string;
  subscriptionId: string;
  status: string;
  createdAt: number;
  updatedAt: number;
};

export type SwitchDetails = {
  [key: string]: SwitchDetail;
};

export type PlanDetailsInitialState = {
  currentPlan: {
    data: CustomerOffer[];
    loading: boolean;
    error: string | null | undefined;
  };
  offerToSwitch: CustomerOffer | Record<string, never>;
  updateList: boolean;
  switchSettings: {
    data: SwitchSettings;
    loading: boolean;
    error: string | null | undefined;
  };
  pendingSwitchesDetails: {
    data: SwitchDetails;
    loading: boolean;
    error: string | null | undefined;
  };
  customerSwitchesHistory: {
    data: SwitchDetail[];
    loading: boolean;
    error: string | null | undefined;
  };
};
