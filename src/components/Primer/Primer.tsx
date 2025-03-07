import { useEffect } from 'react';
import {
  Primer as PrimerSDK,
  UniversalCheckoutOptions
} from '@primer-io/checkout-web';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import Loader from 'components/Loader';
import { PrimerProps } from 'types/Primer.types';
import { usePrimer } from './usePrimer';

const CONTAINER = 'msd__primerWrapper';
const DEFAULT_PRIMER_PAYMENT_METHOD = 'primer-card';

const options: UniversalCheckoutOptions = {
  container: `#${CONTAINER}`,
  apiVersion: '2.4',
  form: {
    inputLabelsVisible: true
  },
  submitButton: {
    useBuiltInButton: true,
    amountVisible: true
  },
  successScreen: false
};

const Primer = ({ selectPaymentMethod, onSubmit }: PrimerProps) => {
  const {
    getPrimerToken,
    isLoading,
    sessionError,
    onCheckoutComplete,
    onCheckoutFail,
    onPaymentMethodAction
  } = usePrimer({ onSubmit, selectPaymentMethod });

  useEffect(() => {
    const createDropIn = async () => {
      const { clientToken } = await getPrimerToken();
      const primerOptions = {
        ...options,
        onCheckoutComplete,
        onCheckoutFail,
        onPaymentMethodAction
      };
      await PrimerSDK.showUniversalCheckout(clientToken, primerOptions);
      await selectPaymentMethod(DEFAULT_PRIMER_PAYMENT_METHOD);
    };
    createDropIn();
  }, []);

  if (sessionError) {
    return <PaymentErrorStyled>{sessionError}</PaymentErrorStyled>;
  }

  if (isLoading) return <Loader />;

  return <div id={CONTAINER} />;
};

export default Primer;
