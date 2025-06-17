import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Primer as PrimerSDK } from '@primer-io/checkout-web';
import type { PrimerCheckout } from '@primer-io/checkout-web';
import { PaymentErrorStyled } from 'components/Payment/PaymentStyled';
import Loader from 'components/Loader';
import { PrimerProps } from 'types/Primer.types';
import { usePrimer } from './usePrimer';

import { PrimerContainer, UpdateButtonStyled } from './PrimerStyled';
import {
  CONTAINER_CLASS_NAME,
  DEFAULT_PRIMER_PAYMENT_METHOD
} from './constants';

const Primer = ({
  selectPaymentMethod,
  onSubmit,
  isMyAccount
}: PrimerProps) => {
  const { t } = useTranslation();

  const [primerCheckout, setPrimerCheckout] = useState<PrimerCheckout | null>(
    null
  );

  const { getPrimerToken, isLoading, sessionError, options, isButtonDisabled } =
    usePrimer({
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

      selectPaymentMethod(DEFAULT_PRIMER_PAYMENT_METHOD, 'primer-adyen');
    };
    createDropIn();
  }, []);

  if (sessionError) {
    return <PaymentErrorStyled>{sessionError}</PaymentErrorStyled>;
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <PrimerContainer id={CONTAINER_CLASS_NAME} />
      {isMyAccount && primerCheckout?.submit && (
        <UpdateButtonStyled
          disabled={isButtonDisabled}
          onClick={primerCheckout.submit}
          type='submit'
        >
          {t('primer.button.update', 'Update')}
        </UpdateButtonStyled>
      )}
    </>
  );
};

export default Primer;
