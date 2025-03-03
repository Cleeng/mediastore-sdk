import { useEffect, useState } from 'react';
import { Primer as PrimerSDK } from '@primer-io/checkout-web';
import { createPrimerSession } from 'api';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import Loader from 'components/Loader';

// Client token will be fetched from the server
const CONTAINER = 'msd__primerWrapper';

const onCheckoutComplete = (...args: any[]) => {
  console.log('Checkout Complete!', args);
  return null;
};

const onCheckoutFail = (error: any, data: { payment?: any }, handler: any) => {
  console.log('Checkout Fail!', error, data.payment);
};

const options = {
  container: `#${CONTAINER}`,
  onCheckoutComplete,
  onCheckoutFail
};

const Primer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const getPrimerToken = async () => {
    try {
      const response = await createPrimerSession();
      setIsLoading(false);
      return response;
    } catch (error) {
      setSessionError('An error occurred!');
      setIsLoading(false);
      return null;
    }
  };

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
