import { CustomerOffer } from 'api/Customer/types';
import { Error } from './common';

type SwitchSetting = {
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

type SwitchSettings = {
  [key: string]: {
    available: SwitchSetting[];
    unavailable: SwitchSetting[];
  };
};

export type SwitchDetails = {
  [key: string]: {
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
};

export type PlanDetailsInitialState = {
  currentPlan: {
    data: CustomerOffer[];
    loading: boolean;
    error: Error;
  };
  offerToSwitch: CustomerOffer | {};
  updateList: boolean;
  switchSettings: {
    data: SwitchSettings;
    loading: boolean;
    error: Error;
  };
  switchDetails: {
    data: SwitchDetails;
    loading: boolean;
    error: Error;
  };
};
