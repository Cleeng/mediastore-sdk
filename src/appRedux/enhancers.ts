import * as Sentry from '@sentry/react';
import { PaymentDetail } from 'api/Customer/types';
import { deliveryDetailsSlice } from './deliveryDetailsSlice';
import { fetchFinalizeAddPaymentDetails } from './finalizeAddPaymentDetailsSlice';
import { fetchFinalizeInitialPayment } from './finalizePaymentSlice';
import { fetchGift, fetchUpdateGift } from './giftSlice';
import {
  fetchCreateOrder,
  fetchGetOrder,
  fetchUpdateCoupon,
  fetchUpdateOrder
} from './orderSlice';
import { fetchPaymentDetails } from './paymentDetailsSlice';
import { fetchListCustomerTransactions } from './transactionsSlice';
import { setCurrentUser } from './userProfile';
import { RootState } from './rootReducer';

const ACTION_TYPES_WITH_SENSITIVE_INFORMATION = [
  deliveryDetailsSlice.actions.setFieldValue.type,
  fetchFinalizeAddPaymentDetails.fulfilled.type,
  fetchFinalizeInitialPayment.fulfilled.type,
  fetchGift.fulfilled.type,
  fetchUpdateGift.fulfilled.type,
  fetchCreateOrder.fulfilled.type,
  fetchGetOrder.fulfilled.type,
  fetchUpdateCoupon.fulfilled.type,
  fetchUpdateOrder.fulfilled.type,
  fetchPaymentDetails.fulfilled.type,
  fetchListCustomerTransactions.fulfilled.type,
  setCurrentUser.type
];

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  actionTransformer: (action) => {
    if (ACTION_TYPES_WITH_SENSITIVE_INFORMATION.includes(action.type)) {
      return null;
    }

    return action;
  },
  stateTransformer: (state: RootState) => {
    const transformedState: RootState = {
      ...state,
      deliveryDetails: {
        ...state.deliveryDetails,
        recipientEmail: {
          ...state.deliveryDetails.recipientEmail,
          value: 'HIDDEN'
        },
        confirmRecipientEmail: {
          ...state.deliveryDetails.confirmRecipientEmail,
          value: 'HIDDEN'
        }
      },
      finalizeAddPaymentDetails: {
        ...state.finalizeAddPaymentDetails,
        paymentDetails: null
      },
      finalizeInitialPayment: {
        ...state.finalizeInitialPayment,
        payment: {
          paymentMethod: 'HIDDEN',
          currency: 'HIDDEN'
        }
      },
      gift: {
        ...state.gift,
        gift: {
          ...state.gift.gift,
          deliveryDetails: {
            ...state.gift.gift.deliveryDetails,
            recipientEmail: 'HIDDEN'
          }
        }
      },
      order: {
        ...state.order,
        order: {
          ...state.order.order,
          billingAddress: 'HIDDEN',
          customer: {
            ...state.order.order.customer,
            email: 'HIDDEN'
          }
        }
      },
      paymentDetails: {
        ...state.paymentDetails,
        paymentDetails: state.paymentDetails.paymentDetails.map(
          (currentPaymentDetail) =>
            ({
              ...currentPaymentDetail,
              paymentMethodSpecificParams: {
                ...currentPaymentDetail.paymentMethodSpecificParams,
                holderName: 'HIDDEN',
                cardExpirationDate: 'HIDDEN',
                socialSecurityNumber: 'HIDDEN'
              }
            } as PaymentDetail)
        ),
        activeOrBoundPaymentDetails:
          state.paymentDetails.activeOrBoundPaymentDetails.map(
            (currentPaymentDetail) =>
              ({
                ...currentPaymentDetail,
                paymentMethodSpecificParams: {
                  ...currentPaymentDetail.paymentMethodSpecificParams,
                  holderName: 'HIDDEN',
                  cardExpirationDate: 'HIDDEN',
                  socialSecurityNumber: 'HIDDEN'
                }
              } as PaymentDetail)
          )
      },
      transactions: {
        ...state.transactions,
        transactions: state.transactions.transactions.map(
          (currentTransaction) => ({
            ...currentTransaction,
            customerEmail: 'HIDDEN'
          })
        )
      },
      userProfile: {
        ...state.userProfile,
        user: {
          ...(state.userProfile.user ?? { id: 0, country: '' }),
          email: 'HIDDEN',
          firstName: 'HIDDEN',
          lastName: 'HIDDEN',
          regDate: 'HIDDEN',
          lastLoginDate: 'HIDDEN',
          lastUserIp: 'HIDDEN',
          externalId: 'HIDDEN',
          externalData: null
        }
      }
    };

    return transformedState;
  }
});

export default sentryReduxEnhancer;
