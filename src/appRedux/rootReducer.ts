import {
  UnknownAction,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import appConfigReducer from './appConfig';
import deliveryDetailsReducer from './deliveryDetailsSlice';
import finalizeAddPaymentDetailsReducer from './finalizeAddPaymentDetailsSlice';
import finalizeInitialPaymentReducer from './finalizePaymentSlice';
import giftReducer from './giftSlice';
import innerPopupReducer from './innerPopupReducer';
import myaccountReducer from './myaccountSlice';
import offerReducer from './offerSlice';
import offersReducer from './offersSlice';
import orderReducer from './orderSlice';
import paymentReducer from './paymentSlice';
import paymentDetailsReducer from './paymentDetailsSlice';
import paymentMethodsReducer from './paymentMethodsSlice';
import planDetailsReducer from './planDetailsSlice';
import popupReducer from './popup';
import popupManagerReducer from './popupSlice';
import publisherConfigReducer from './publisherConfigSlice';
import publisherConsentsReducer from './publisherConsentsSlice';
import transactionsReducer from './transactionsSlice';
import unsubscribeReducer from './unsubscribeSlice';
import userProfileReducer from './userProfile';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  deliveryDetails: deliveryDetailsReducer,
  finalizeAddPaymentDetails: finalizeAddPaymentDetailsReducer,
  finalizeInitialPayment: finalizeInitialPaymentReducer,
  gift: giftReducer,
  innerPopup: innerPopupReducer,
  myaccount: myaccountReducer,
  offer: offerReducer,
  offers: offersReducer,
  order: orderReducer,
  payment: paymentReducer,
  paymentDetails: paymentDetailsReducer,
  paymentMethods: paymentMethodsReducer,
  plan: planDetailsReducer,
  popup: popupReducer,
  popupManager: popupManagerReducer,
  publisherConfig: publisherConfigReducer,
  publisherConsents: publisherConsentsReducer,
  transactions: transactionsReducer,
  unsubscribe: unsubscribeReducer,
  userProfile: userProfileReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

export default (
  state: Parameters<typeof rootReducer>[0],
  action: UnknownAction
) => rootReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);
