import { useState } from 'react';
import { OnCheckoutFailHandler, Payment } from '@primer-io/checkout-web';
import { createPrimerSession, authorizePrimerPurchase } from 'api';
import { UsePrimerHookProps } from 'types/Primer.types';

type PrimerClientError = {
  code: string;
  message: string;
  [key: string]: any;
};

export const usePrimer = ({ onSubmit, isMyAccount }: UsePrimerHookProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const getPrimerToken = async () => {
    try {
      setIsLoading(true);
      const response = await createPrimerSession();
      return response;
    } catch (error) {
      setSessionError('An error occurred!');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const onCheckoutComplete = async ({
    payment
  }: {
    payment: Payment | null;
  }) => {
    if (!payment) {
      setSessionError('An error occurred!');
      return;
    }

    const { id, orderId } = payment;

    try {
      setIsLoading(true);

      if (!isMyAccount) {
        await authorizePrimerPurchase(id, parseInt(orderId, 10));
      }

      onSubmit();
    } catch (error) {
      setSessionError('An error occurred!');
    } finally {
      setIsLoading(false);
    }
  };

  const onCheckoutFail = (
    error: PrimerClientError,
    data: { payment?: Payment | undefined },
    handler: OnCheckoutFailHandler | undefined
  ): void => {
    console.log('onCheckoutFail', error, data.payment);
    if (!handler) {
      return;
    }
    handler.showErrorMessage();
  };

  const onPaymentMethodAction = (action: string, data: object) => {
    console.log('onPaymentMethodAction', action, data);
    // for the PAYMENT_METHOD_SELECTED action we should call the
  };

  return {
    getPrimerToken,
    isLoading,
    setIsLoading,
    sessionError,
    setSessionError,
    onCheckoutComplete,
    onCheckoutFail,
    onPaymentMethodAction
  };
};
