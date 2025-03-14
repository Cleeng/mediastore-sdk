import { useEffect } from 'react';
import { Primer as PrimerSDK } from '@primer-io/checkout-web';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import Loader from 'components/Loader';
import { PrimerProps } from 'types/Primer.types';
import { usePrimer } from './usePrimer';

import { PrimerContainer } from './PrimerStyled';

const CONTAINER = 'msd__primerWrapper';
const DEFAULT_PRIMER_PAYMENT_METHOD = 'primer-card';

const Primer = ({
  selectPaymentMethod,
  onSubmit,
  isMyAccount
}: PrimerProps) => {
  const { getPrimerToken, isLoading, sessionError, options } = usePrimer({
    onSubmit,
    selectPaymentMethod,
    isMyAccount
  });

  useEffect(() => {
    const createDropIn = async () => {
      const { clientToken } = await getPrimerToken();

      await PrimerSDK.showUniversalCheckout(clientToken, options);
      selectPaymentMethod(DEFAULT_PRIMER_PAYMENT_METHOD);
    };
    createDropIn();
  }, []);

  if (sessionError) {
    return <PaymentErrorStyled>{sessionError}</PaymentErrorStyled>;
  }

  if (isLoading) return <Loader />;

  return <PrimerContainer id={CONTAINER} />;
};

export default Primer;
