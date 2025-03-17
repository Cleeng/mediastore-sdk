import { Error } from './common';

export type UnsubscribeInitialState = {
  loading: boolean;
  error: Error;
};

export type FetchUnsubscribeParams = {
  offerId: string | undefined;
  checkedReason?: string;
};
