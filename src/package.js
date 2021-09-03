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
import UpdateProfile from 'containers/UpdateProfile';
import SubscriptionSwitchesList from 'components/SubscriptionSwitchesList';
import Capture from 'components/Capture/Capture';
import CheckoutConsents from 'components/CheckoutConsents';

export {
  // Identity Management
  Register,
  Login,
  // Checkout
  OfferContainer as Purchase,
  // My Account
  MyAccount,
  PlanDetails,
  UpdateProfile,
  PaymentInfo,
  SubscriptionSwitchesList,
  Capture,
  Config,
  Auth,
  Card,
  Consents,
  CheckoutConsents,
  store
};
