import getConsents from './Publisher/getConsents';
import createOrder from './Offer/createOrder';
import getOfferDetails from './Customer/getOfferDetails';
import getPaymentMethods from './Publisher/getPaymentMethods';
import loginCustomer from './Auth/loginCustomer';
import registerCustomer from './Auth/registerCustomer';
import resetPassword from './Auth/resetPassword';
import submitPayment from './Offer/submitPayment';
import submitPaymentWithoutDetails from './Offer/submitPaymentWithoutDetails';
import updateOrder from './Offer/updateOrder';
import getPaymentDetails from './Customer/getPaymentDetails';
import getCustomerSubscriptions from './Customer/getCustomerSubscriptions';
import getCustomer from './Customer/getCustomer';
import listCustomerTransactions from './Customer/listCustomerTransactions';
import getCustomerConsents from './Customer/getCustomerConsents';
import submitPayPalPayment from './Offer/submitPayPalPayment';
import getAvailableSwitches from './Customer/getAvailableSwitches';
import subscriptionSwitch from './Customer/subscriptionSwitch';
import applyCoupon from './Customer/applyCoupon';
import getCaptureStatus from './Customer/getCaptureStatus';
import updateCaptureAnswers from './Customer/updateCaptureAnswers';
import submitConsents from './Customer/submitConsents';

export {
  getPaymentMethods,
  getPaymentDetails,
  getCustomerSubscriptions,
  getCustomer,
  createOrder,
  updateOrder,
  submitPayment,
  submitPaymentWithoutDetails,
  getConsents,
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
  submitConsents
};
