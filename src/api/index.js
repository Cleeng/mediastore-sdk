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
import getCustomerOffers from './Customer/getCustomerOffers';
import getCustomer from './Customer/getCustomer';
import listCustomerTransactions from './Customer/listCustomerTransactions';
import getCustomerConsents from './Customer/getCustomerConsents';
import submitPayPalPayment from './Payment/submitPayPalPayment';
import getAvailableSwitches, {
  getAvailableSwitchesRefactored
} from './Customer/getAvailableSwitches';
import subscriptionSwitch from './Customer/subscriptionSwitch';
import applyCoupon from './Customer/applyCoupon';
import getCaptureStatus from './Customer/getCaptureStatus';
import updateCaptureAnswers from './Customer/updateCaptureAnswers';
import submitConsents from './Customer/submitConsents';
import getPaymentMethods from './Publisher/getPaymentMethods';
import getConsents from './Publisher/getConsents';
import getOrder from './Order/getOrder';
import updateSwitch from './Customer/updateSwitch';
import getSwitch, { getSwitchRefactored } from './Customer/getSwitch';
import updatePayPalPaymentDetails from './PaymentDetails/updatePayPalPaymentDetails';
import finalizeInitialPayment from './Payment/finalizeInitialPayment';
import finalizeAddPaymentDetails from './Payment/finalizeAddPaymentDetails';
import getOffers from './Offers/getOffers';

export {
  getPaymentDetails,
  getCustomerSubscriptions,
  getCustomerOffers,
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
  getConsents,
  getOrder,
  updateSwitch,
  updatePayPalPaymentDetails,
  finalizeInitialPayment,
  finalizeAddPaymentDetails,
  getOffers,
  getSwitch,
  getSwitchRefactored,
  getAvailableSwitchesRefactored
};
