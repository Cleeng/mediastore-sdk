import { CustomerOffer as CurrentPlan } from 'api/Customer/types';

export type PlanDetailsInitialState = {
  currentPlan: CurrentPlan[] | null;
  loading: boolean;
  error: string | null | undefined;
};
