import { Consent } from 'types/components/Consents.types';

export type ConsentsProps = {
  error?: string;
  onChangeFn: (checked: boolean[], publisherConsents: Consent[]) => void;
};
