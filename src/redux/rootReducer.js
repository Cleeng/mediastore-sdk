import { combineReducers } from '@reduxjs/toolkit';
import paymentInfoReducer from './paymentInfo';
import paymentDetailsReducer from './planDetails';
import userProfileReducer from './userProfile';
import popupReducer from './popup';
import appConfigReducer from './appConfig';
import innerPopupReducer from './innerPopupReducer';

const rootReducer = combineReducers({
  paymentInfo: paymentInfoReducer,
  planDetails: paymentDetailsReducer,
  userProfile: userProfileReducer,
  popup: popupReducer,
  appConfig: appConfigReducer,
  innerPopup: innerPopupReducer
});

export default rootReducer;
