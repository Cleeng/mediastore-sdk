import './i18NextInit';
import Card from 'components/Card';
import OfferContainer from 'containers/OfferContainer';
import Login from 'components/LoginPage';
import Register from 'components/RegisterPage';
import MyAccount from 'containers/MyAccount';
import Auth from 'services/auth';
import store from 'appRedux/store';
import Config, { getData } from 'util/appConfigHelper';
import eventDispatcher, {
  MSSDK_PURCHASE_FAILED,
  MSSDK_PURCHASE_SUCCESSFUL
} from 'util/eventDispatcher';
import { isPayPalExternalId } from 'util/paymentMethodHelper';
import trackMixpanelEvent from 'util/trackMixpanelEvent';
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

if (typeof window !== 'undefined') {
  window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const externalPaymentId = urlParams.get('externalPaymentId');
    const message = urlParams.get('message');

    const payPalMixpanelEventData = {
      distinct_id: getData('CLEENG_CUSTOMER_ID'),
      publisherId: getData('CLEENG_PUBLISHER_ID'),
      offerId: getData('CLEENG_OFFER_ID'),
      paymentMethod: 'PayPal',
      paymentGateway: 'PayPal'
    };

    if (isPayPalExternalId(externalPaymentId)) {
      trackMixpanelEvent('Payment Succeeded', payPalMixpanelEventData);

      eventDispatcher(MSSDK_PURCHASE_SUCCESSFUL, {
        payment: {
          externalPaymentId
        }
      });
    }

    // the only info we get if PayPal payment fails is message param in the URL
    if (message) {
      trackMixpanelEvent('Payment Failed', {
        ...payPalMixpanelEventData,
        message
      });

      eventDispatcher(MSSDK_PURCHASE_FAILED, {
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
