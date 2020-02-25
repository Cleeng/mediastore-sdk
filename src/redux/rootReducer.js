import { combineReducers } from '@reduxjs/toolkit';
import paymentInfoReducer from './paymentInfo';
import paymentDetailsReducer from './planDetails';

const rootReducer = combineReducers({
  paymentInfo: paymentInfoReducer,
  planDetails: paymentDetailsReducer
});

export default rootReducer;
