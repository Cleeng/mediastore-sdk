import { useState } from 'react';
import { useStore } from 'react-redux';
import { UniversalCheckoutOptions } from '@primer-io/checkout-web';
import { createPrimerSession, authorizePrimerPurchase } from 'api';
import updatePrimerPaymentDetails from 'api/PaymentDetails/Primer/updatePrimerPaymentDetails';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { selectOnlyOrder } from 'appRedux/orderSlice';
import { fetchPaymentDetails } from 'appRedux/paymentDetailsSlice';
// import { selectPaymentMethods } from 'appRedux/paymentMethodsSlice';
import {
  PAYMENT_DETAILS_STEPS,
  updatePaymentDetailsPopup
} from 'appRedux/popupSlice';
import eventDispatcher, {
  MSSDK_UPDATE_PAYMENT_DETAILS_FAILED,
  MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL
} from 'util/eventDispatcher';
import { RootState } from 'appRedux/rootReducer';
import { UsePrimerHookProps } from 'types/Primer.types';
import { CONTAINER_CLASS_NAME } from './constants';

export const usePrimer = ({ onSubmit, isMyAccount }: UsePrimerHookProps) => {
  const store = useStore<RootState>();

  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const dispatch = useAppDispatch();

  const { id: orderId } = useAppSelector(selectOnlyOrder);

  const handleUpdatePaymentDetails = async (externalPaymentId: string) => {
    try {
      const {
        paymentMethods: { selectedPaymentMethod }
      } = store.getState();

      if (!selectedPaymentMethod) {
        throw new Error('No payment method selected');
      }

      await updatePrimerPaymentDetails(
        selectedPaymentMethod.id,
        externalPaymentId
      );

      eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_SUCCESSFUL);
      dispatch(
        updatePaymentDetailsPopup({
          isLoading: false,
          step: PAYMENT_DETAILS_STEPS.SUCCESS
        })
      );
      dispatch(fetchPaymentDetails());
    } catch (error) {
      console.error(error);
      eventDispatcher(MSSDK_UPDATE_PAYMENT_DETAILS_FAILED);
      dispatch(
        updatePaymentDetailsPopup({ step: PAYMENT_DETAILS_STEPS.ERROR })
      );
    }
  };

  const getPrimerToken = async () => {
    try {
      setIsLoading(true);
      const response = await createPrimerSession(isMyAccount);
      return response;
    } catch (error) {
      console.error(error);
      setSessionError('An error occurred!');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const options: UniversalCheckoutOptions = {
    container: `#${CONTAINER_CLASS_NAME}`,
    apiVersion: '2.4',
    form: {
      inputLabelsVisible: true
    },
    submitButton: {
      useBuiltInButton: !isMyAccount,
      onDisable(isDisabled) {
        setIsButtonDisabled(isDisabled);
      },
      amountVisible: !isMyAccount
    },
    successScreen: false,
    vault: {
      visible: !isMyAccount
    },
    onBeforePaymentCreate: (_, handler) => {
      // validate gift delivery details here
      return handler.continuePaymentCreation();
    },
    onPaymentCreationStart: () => {
      if (isMyAccount) {
        dispatch(updatePaymentDetailsPopup({ isLoading: true }));
      }
    },
    onCheckoutFail: async (error, data, handler) => {
      console.log('onCheckoutFail', error, data.payment);

      if (!handler) {
        return;
      }

      handler.showErrorMessage();
    },
    onCheckoutComplete: async (data) => {
      const { payment } = data;

      if (!payment?.id) {
        setSessionError('An error occurred!');
        return;
      }

      try {
        setIsLoading(true);

        if (isMyAccount) {
          await handleUpdatePaymentDetails(payment.id);
          return;
        }

        await authorizePrimerPurchase(payment.id, orderId);

        if (onSubmit) {
          onSubmit();
        }
      } catch (error) {
        console.error(error);
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
    options,
    isButtonDisabled
  };
};
