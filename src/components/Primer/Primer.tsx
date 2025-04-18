import { useEffect, useState } from 'react';
import { Primer as PrimerSDK } from '@primer-io/checkout-web';
import type { PrimerCheckout } from '@primer-io/checkout-web';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import Loader from 'components/Loader';
import { PrimerProps } from 'types/Primer.types';
import { usePrimer } from './usePrimer';

import { PrimerContainer, UpdateButtonStyled } from './PrimerStyled';

const CONTAINER = 'msd__primerWrapper';
const DEFAULT_PRIMER_PAYMENT_METHOD = 'primer-card';

const Primer = ({
  selectPaymentMethod,
  onSubmit,
  isMyAccount
}: PrimerProps) => {
  const [primerCheckout, setPrimerCheckout] = useState<PrimerCheckout | null>(
    null
  );

  const {
    getPrimerToken,
    isLoading,
    sessionError,
    options,
    isButtonVisible,
    isButtonDisabled
  } = usePrimer({
    onSubmit,
    selectPaymentMethod,
    isMyAccount
  });

  useEffect(() => {
    const createDropIn = async () => {
      const { clientToken } = await getPrimerToken();

      const checkout = await PrimerSDK.showUniversalCheckout(
        clientToken,
        options
      );

      setPrimerCheckout(checkout);

      selectPaymentMethod(DEFAULT_PRIMER_PAYMENT_METHOD);
    };
    createDropIn();
  }, []);

  if (sessionError) {
    return <PaymentErrorStyled>{sessionError}</PaymentErrorStyled>;
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <PrimerContainer id={CONTAINER} />
      {primerCheckout && (
        <UpdateButtonStyled
          disabled={isButtonDisabled}
          hidden={isButtonVisible}
          onClick={() => primerCheckout?.submit()}
          type='submit'
        >
          Update
        </UpdateButtonStyled>
      )}
    </>
  );
};

export default Primer;
