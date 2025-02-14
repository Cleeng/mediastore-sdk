import { lazy } from 'react';
import { selectPublisherConfig } from 'appRedux/publisherConfigSlice';
import { useAppSelector } from 'appRedux/store';
import { shouldShowGatewayComponent } from 'util/paymentMethodHelper';

import { AdyenProps } from 'types/Adyen.types';

const Adyen = lazy(
  () => import(/* webpackChunkName: "adyen-component" */ 'components/Adyen')
);
const Primer = lazy(
  () => import(/* webpackChunkName: "primer-component" */ 'components/Primer')
);

type UsePaymentDropInReturnType = {
  Component: typeof Adyen | typeof Primer;
  props: AdyenProps | Record<string, unknown>;
} | null;

const usePaymentDropIn = (
  adyenProps: AdyenProps
): UsePaymentDropInReturnType => {
  const { paymentMethods: publisherPaymentMethods } = useAppSelector(
    selectPublisherConfig
  );

  if (shouldShowGatewayComponent('primer', publisherPaymentMethods)) {
    return { Component: Primer, props: {} };
  }

  if (shouldShowGatewayComponent('adyen', publisherPaymentMethods)) {
    return { Component: Adyen, props: adyenProps };
  }

  return null;
};

export default usePaymentDropIn;
