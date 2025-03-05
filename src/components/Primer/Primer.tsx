import { useEffect } from 'react';
import { Primer as PrimerSDK } from '@primer-io/checkout-web';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import Loader from 'components/Loader';
import { usePrimer } from './usePrimer';

// Client token will be fetched from the server
const CONTAINER = 'msd__primerWrapper';

const onCheckoutComplete = (...args: any[]) => {
  console.log('Checkout Complete!', args);
  return null;
};

const onCheckoutFail = (error: any, data: { payment?: any }) => {
  console.log('Checkout Fail!', error, data.payment);
};

const options = {
  container: `#${CONTAINER}`,
  onCheckoutComplete,
  onCheckoutFail
};

const Primer = () => {
  const { getPrimerToken, isLoading, sessionError } = usePrimer();

  useEffect(() => {
    const createDropIn = async () => {
      const { clientToken } = await getPrimerToken();
      await PrimerSDK.showUniversalCheckout(clientToken, options);
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
