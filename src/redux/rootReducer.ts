import {
  AnyAction,
  combineReducers,
  configureStore,
  PreloadedState
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
import retentionActionsReducer from './retentionActionsSlice';
import transactionsReducer from './transactionsSlice';
import unsubscribeReducer from './unsubscribeSlice';
import userProfileReducer from './userProfile';
import settingsReducer from './settingsSlice';

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
  // removed planDetails - to be checked if was needed
  popup: popupReducer,
  popupManager: popupManagerReducer,
  publisherConfig: publisherConfigReducer,
  publisherConsents: publisherConsentsReducer,
  retentionActions: retentionActionsReducer,
  transactions: transactionsReducer,
  unsubscribe: unsubscribeReducer,
  userProfile: userProfileReducer,
  settings: settingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

export default (state: Parameters<typeof rootReducer>[0], action: AnyAction) =>
  rootReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);
