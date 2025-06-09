import { AdyenProps } from 'types/Adyen.types';
import { PrimerProps } from 'types/Primer.types';

export type PaymentDropInProps = {
  adyenProps: AdyenProps;
  primerProps: PrimerProps;
  isMyAccount?: boolean;
};
