import './i18NextInit';
import Card from 'components/Card';
import OfferContainer from 'containers/OfferContainer';
import Login from 'components/LoginPage';
import Register from 'components/RegisterPage';
import MyAccount from 'containers/MyAccount';
import Auth from 'services/auth';
import store from 'appRedux/store';
import Config from 'util/appConfigHelper';
import PlanDetails from 'containers/PlanDetails';
import PaymentInfo from 'containers/PaymentInfo';
import TransactionList from 'containers/TransactionList';
import Subscriptions from 'containers/Subscriptions';
import UpdateProfile from 'containers/UpdateProfile';
import SubscriptionSwitches from 'containers/SubscriptionSwitches';
import Capture from 'components/Capture/Capture';
import CheckoutConsents from 'components/CheckoutConsents';
import PasswordReset from 'components/PasswordReset';
import ThankYouPage from 'components/ThankYouPage';
import Checkout from 'components/Checkout';
import RedeemGift from 'components/RedeemGift';
import eventDispatcher, {
  MSSDK_PURCHASE_SUCCESSFUL
} from 'util/eventDispatcher';

if (typeof window !== 'undefined') {
  window.onload = () => {
    console.log('testing regression workflow');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const externalPaymentId = urlParams.get('externalPaymentId');
    if (externalPaymentId) {
      eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
        payment: {
          externalPaymentId
        }
      });
    }
  };
}

export {
  // Identity Management
  Register,
  Login,
  PasswordReset,
  // Checkout
  Checkout,
  OfferContainer as Purchase,
  RedeemGift,
  ThankYouPage,
  // My Account
  MyAccount,
  PlanDetails,
  UpdateProfile,
  PaymentInfo,
  SubscriptionSwitches,
  Capture,
  Config,
  Auth,
  Card,
  CheckoutConsents,
  TransactionList,
  Subscriptions,
  Subscriptions as Offers,
  store
};
