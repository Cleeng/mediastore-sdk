import { Suspense } from 'react';
import Loader from 'components/Loader';
import usePaymentDropIn from 'hooks/usePaymentDropIn';

import { PaymentDropInProps } from './PaymentDropIn.types';

const PaymentDropIn = ({
  adyenProps,
  primerProps,
  isMyAccount
}: PaymentDropInProps) => {
  const dropInComponent = usePaymentDropIn(adyenProps, primerProps);

  if (!dropInComponent) {
    return null;
  }

  const { Component, props } = dropInComponent;

  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} isMyAccount={isMyAccount} />
    </Suspense>
  );
};

export default PaymentDropIn;
