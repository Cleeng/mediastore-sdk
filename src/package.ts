// import './sentryInit';
import './i18NextInit';
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

import {
  BrowserClient,
  defaultStackParser,
  getDefaultIntegrations,
  makeFetchTransport,
  Scope
} from '@sentry/browser';

const SENTRY_SUPPORTED_ENVIRONMENTS = ['production', 'sandbox'];
const cleengEnvironment = getData('CLEENG_ENVIRONMENT');

if (
  typeof window !== 'undefined' &&
  SENTRY_SUPPORTED_ENVIRONMENTS.includes(cleengEnvironment)
) {
  const mediastoreSDKRegexp = /@?cleeng.mediastore-sdk/;

  // * filter out the integrations that use the global context
  const integrations = getDefaultIntegrations({}).filter(
    (defaultIntegration) => {
      return !['BrowserApiErrors', 'Breadcrumbs', 'GlobalHandlers'].includes(
        defaultIntegration.name
      );
    }
  );

  const client = new BrowserClient({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    transport: makeFetchTransport,
    stackParser: defaultStackParser,
    integrations,
    environment: cleengEnvironment,
    release: import.meta.env.VITE_MEDIASTORE_SDK_VERSION,
    attachStacktrace: true,
    autoSessionTracking: true,
    sendClientReports: true,
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
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event) {
      return {
        ...event,
        extra: {
          ...event.extra,
          publisherId: getData('CLEENG_PUBLISHER_ID'),
          offerId: getData('CLEENG_OFFER_ID')
        }
      };
    }
  });

  const scope = new Scope();
  scope.setClient(client);
  client.init();

  window.addEventListener('error', (event: ErrorEvent) => {
    if (!mediastoreSDKRegexp.test(event.error.stack ?? event.filename ?? '')) {
      return;
    }
    scope.captureException(event);
  });
  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      if (!mediastoreSDKRegexp.test(event.reason.stack ?? '')) {
        return;
      }
      scope.captureException(event);
    }
  );
}

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
