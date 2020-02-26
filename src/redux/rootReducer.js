import { combineReducers } from '@reduxjs/toolkit';
import paymentInfoReducer from './paymentInfo';
import paymentDetailsReducer from './planDetails';
import loaderReducer from './loader';

const rootReducer = combineReducers({
  paymentInfo: paymentInfoReducer,
  planDetails: paymentDetailsReducer,
  loader: loaderReducer
});

export default rootReducer;
