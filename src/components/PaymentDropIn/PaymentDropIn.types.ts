import { AdyenProps } from 'types/Adyen.types';

type PrimerProps = {
  onSubmit: unknown;
  onAdditionalDetails: unknown;
};

export type PaymentDropInProps = {
  adyenProps: AdyenProps;
  primerProps: PrimerProps;
};
