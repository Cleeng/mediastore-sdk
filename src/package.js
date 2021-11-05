import './styles/index.scss';
import Card from 'components/Card';
import Consents from 'components/Consents';
import OfferContainer from 'containers/OfferContainer';
import Login from 'components/LoginPage';
import Register from 'components/RegisterPage';
import MyAccount from 'containers/MyAccount';
import Auth from 'services/auth';
import store from 'redux/store';
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

export {
  // Identity Management
  Register,
  Login,
  PasswordReset,
  // Checkout
  Checkout,
  OfferContainer as Purchase,
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
  Consents,
  CheckoutConsents,
  TransactionList,
  Subscriptions,
  store
};
