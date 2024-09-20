import './i18NextInit';
import * as Sentry from '@sentry/react';
import Card from 'components/Card';
import OfferContainer from 'containers/OfferContainer';
import Login from 'components/LoginPage';
import Register from 'components/RegisterPage';
import MyAccount from 'containers/MyAccount';
import Auth from 'services/auth';
import store from 'appRedux/store';
import Config, { getData } from 'util/appConfigHelper';
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

const SENTRY_SUPPORTED_ENVIRONMENTS = ['production', 'sandbox'];
const CURRENT_BUILD_ENVIRONMENT =
  getData('CLEENG_ENVIRONMENT') ?? import.meta.env.MODE;
const shouldInitializeSentry = SENTRY_SUPPORTED_ENVIRONMENTS.includes(
  CURRENT_BUILD_ENVIRONMENT
);

if (typeof window !== 'undefined') {
  window.onload = () => {
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

if (shouldInitializeSentry) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_MEDIASTORE_SDK_VERSION,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration()
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
      'localhost',
      /^https:\/\/auth\.api\.prod\.cleeng\.com\/.*/,
      /^https:\/\/auth\.api\.sandbox\.cleeng\.com\/.*/,
      /^https:\/\/api\.cleeng\.com\/3\.0\/json-rpc\/.*/,
      /^https:\/\/sandbox\.cleeng\.com\/api\/3\.0\/json-rpc\/.*/,
      /^https:\/\/mediastoreapi\.cleeng\.com\/.*/,
      /^https:\/\/mediastoreapi-sandbox\.cleeng\.com\/.*/,
      /^https:\/\/api\.cleeng\.com\/3\.1\/.*/,
      /^https:\/\/api\.sandbox\.cleeng\.com\/3\.1\/.*/
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0
  });
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
