import { combineReducers } from '@reduxjs/toolkit';
import paymentDetailsReducer from './planDetails';

const rootReducer = combineReducers({
  planDetails: paymentDetailsReducer
});

export default rootReducer;
