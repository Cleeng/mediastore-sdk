import { Consent } from 'types/components/Consents.types';

export type PublisherConsentsInitialState = {
  publisherConsents: Consent[];
  checked: boolean[];
  loading: boolean;
  error: string | null | undefined;
};
