import { lazy, Suspense } from 'react';
import { selectPublisherConfig } from 'appRedux/publisherConfigSlice';
import { useAppSelector } from 'appRedux/store';
import { shouldShowGatewayComponent } from 'util/paymentMethodHelper';
import Loader from 'components/Loader';

import { PaymentDropInProps } from './PaymentDropIn.types';

const Adyen = lazy(
  () => import(/* webpackChunkName: "adyen-component" */ 'components/Adyen')
);
const Primer = lazy(
  () => import(/* webpackChunkName: "primer-component" */ 'components/Primer')
);

const PaymentDropIn = ({ adyenProps }: PaymentDropInProps) => {
  const { paymentMethods: publisherPaymentMethods } = useAppSelector(
    selectPublisherConfig
  );

  const getPaymentDropIn = () => {
    if (shouldShowGatewayComponent('primer', publisherPaymentMethods)) {
      return <Primer />;
    }

    if (shouldShowGatewayComponent('adyen', publisherPaymentMethods)) {
      return <Adyen {...adyenProps} />;
    }

    return null;
  };

  return <Suspense fallback={<Loader />}>{getPaymentDropIn()}</Suspense>;
};

export default PaymentDropIn;
