import createOrder from './Order/createOrder';
import getOfferDetails from './Customer/getOfferDetails';
import loginCustomer from './Auth/loginCustomer';
import registerCustomer from './Auth/registerCustomer';
import resetPassword from './Auth/resetPassword';
import submitPayment from './Payment/submitPayment';
import submitPaymentWithoutDetails from './Payment/submitPaymentWithoutDetails';
import updateOrder from './Order/updateOrder';
import getPaymentDetails from './Customer/getPaymentDetails';
import getCustomerSubscriptions from './Customer/getCustomerSubscriptions';
import getCustomer from './Customer/getCustomer';
import listCustomerTransactions from './Customer/listCustomerTransactions';
import getCustomerConsents from './Customer/getCustomerConsents';
import submitPayPalPayment from './Payment/submitPayPalPayment';
import getAvailableSwitches from './Customer/getAvailableSwitches';
import subscriptionSwitch from './Customer/subscriptionSwitch';
import applyCoupon from './Customer/applyCoupon';
import getCaptureStatus from './Customer/getCaptureStatus';
import updateCaptureAnswers from './Customer/updateCaptureAnswers';
import submitConsents from './Customer/submitConsents';
import getPaymentMethods from './Publisher/getPaymentMethods';
import getConsents from './Publisher/getConsents';

export {
  getPaymentDetails,
  getCustomerSubscriptions,
  getCustomer,
  createOrder,
  updateOrder,
  submitPayment,
  submitPaymentWithoutDetails,
  getCaptureStatus,
  updateCaptureAnswers,
  getOfferDetails,
  loginCustomer,
  registerCustomer,
  resetPassword,
  listCustomerTransactions,
  getCustomerConsents,
  submitPayPalPayment,
  getAvailableSwitches,
  subscriptionSwitch,
  applyCoupon,
  submitConsents,
  getPaymentMethods,
  getConsents
};
