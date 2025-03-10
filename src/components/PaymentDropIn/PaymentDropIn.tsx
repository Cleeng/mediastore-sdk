import { Suspense } from 'react';
import Loader from 'components/Loader';
import usePaymentDropIn from 'hooks/usePaymentDropIn';

import { PaymentDropInProps } from './PaymentDropIn.types';

const PaymentDropIn = ({ adyenProps, primerProps }: PaymentDropInProps) => {
  const dropInComponent = usePaymentDropIn(adyenProps, primerProps);

  if (!dropInComponent) {
    return null;
  }

  const { Component, props } = dropInComponent;

  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default PaymentDropIn;
