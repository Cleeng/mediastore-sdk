export type Consent = {
  customerId: string;
  name: string;
  required: boolean;
  state: string;
  version: string;
  needsUpdate: boolean;
  label: string;
  value: string;
  newestVersion: string;
  date: number;
};

export const CONSENTS_POPUP_VARIANTS = {
  NOT_CHECKED_TERMS: 'notCheckedTerms',
  TERMS_UPDATE_REQUIRED: 'termsUpdateRequired',
  CONSENTS_UPDATE_REQUIRED: 'consentsUpdateRequired',
  COMPLEX_UPDATE: 'complexUpdate'
} as const;

type ConsentsPopupTypesKeys = keyof typeof CONSENTS_POPUP_VARIANTS;
export type ConsentsPopupTypes =
  (typeof CONSENTS_POPUP_VARIANTS)[ConsentsPopupTypesKeys];

export type ConsentsPopupInitialState = {
  isPopupShown: boolean;
  popupType: ConsentsPopupTypes | '';
  consents: Consent[];
};
