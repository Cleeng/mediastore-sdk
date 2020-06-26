import { combineReducers } from '@reduxjs/toolkit';
import paymentInfoReducer from './paymentInfo';
import paymentDetailsReducer from './planDetails';
import userProfileReducer from './userProfile';
import popupReducer from './popup';

const rootReducer = combineReducers({
  paymentInfo: paymentInfoReducer,
  planDetails: paymentDetailsReducer,
  userProfile: userProfileReducer,
  popup: popupReducer
});

export default rootReducer;
