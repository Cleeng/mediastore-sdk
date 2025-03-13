import { useState } from 'react';
import { UniversalCheckoutOptions } from '@primer-io/checkout-web';
import { createPrimerSession, authorizePrimerPurchase } from 'api';
import { UsePrimerHookProps } from 'types/Primer.types';

const CONTAINER = 'msd__primerWrapper';

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

  const options: UniversalCheckoutOptions = {
    container: `#${CONTAINER}`,
    apiVersion: '2.4',
    form: {
      inputLabelsVisible: true
    },
    submitButton: {
      useBuiltInButton: true,
      amountVisible: true
    },
    successScreen: false,
    onCheckoutFail: (error, data, handler) => {
      console.log('onCheckoutFail', error, data.payment);

      if (!handler) {
        return;
      }
      handler.showErrorMessage();
    },
    onCheckoutComplete: async (data) => {
      const { payment } = data;

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
    },
    onPaymentMethodAction: (paymentMethodAction) => {
      console.log('onPaymentMethodAction', paymentMethodAction);
      // selectPaymentMethod handler
    }
  };

  return {
    getPrimerToken,
    isLoading,
    sessionError,
    options
  };
};
