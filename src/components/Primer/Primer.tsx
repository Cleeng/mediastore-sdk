import { useEffect } from 'react';
import { Primer as PrimerSDK } from '@primer-io/checkout-web';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import Loader from 'components/Loader';
import { usePrimer } from './usePrimer';

// Client token will be fetched from the server
const CONTAINER = 'msd__primerWrapper';
const DEFAULT_PRIMER_PAYMENT_METHOD = 'primer-card';

const options = {
  container: `#${CONTAINER}`
};

const Primer = ({ selectPaymentMethod, onSubmit }) => {
  const {
    getPrimerToken,
    isLoading,
    sessionError,
    onCheckoutComplete,
    onCheckoutFail
  } = usePrimer(onSubmit);

  useEffect(() => {
    const createDropIn = async () => {
      const { clientToken } = await getPrimerToken();
      const primerOptions = { ...options, onCheckoutComplete, onCheckoutFail };
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
