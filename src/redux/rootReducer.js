import { combineReducers } from '@reduxjs/toolkit';
import paymentInfoReducer from './paymentInfo';
import paymentDetailsReducer from './planDetails';
import userProfileReducer from './userProfile';
import popupReducer from './popup';
import appConfigReducer from './appConfig';
import innerPopupReducer from './innerPopupReducer';
import offerReducer from './offerSlice';
import orderReducer from './orderSlice';
import paymentMethodsReducer from './paymentMethodsSlice';
import publisherConfigReducer from './publisherConfigSlice';
import paymentReducer from './paymentSlice';
import finalizeInitialPaymentReducer from './finalizePaymentSlice';
import finalizeAddPaymentDetailsReducer from './finalizeAddPaymentDetailsSlice';
import popupManagerReducer from './popupSlice';
import myaccountReducer from './myaccountSlice';

const rootReducer = combineReducers({
  paymentInfo: paymentInfoReducer,
  planDetails: paymentDetailsReducer,
  userProfile: userProfileReducer,
  popup: popupReducer,
  appConfig: appConfigReducer,
  innerPopup: innerPopupReducer,
  offer: offerReducer,
  order: orderReducer,
  paymentMethods: paymentMethodsReducer,
  publisherConfig: publisherConfigReducer,
  payment: paymentReducer,
  finalizeInitialPayment: finalizeInitialPaymentReducer,
  finalizeAddPaymentDetails: finalizeAddPaymentDetailsReducer,
  popupManager: popupManagerReducer,
  myaccount: myaccountReducer
});

export default (state, action) =>
  rootReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);
