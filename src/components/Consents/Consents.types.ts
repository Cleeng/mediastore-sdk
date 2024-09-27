import { Consent } from 'types/Consents.types';

export type ConsentsProps = {
  error?: string;
  onChangeFn: (checked: boolean[], publisherConsents: Consent[]) => void;
};
