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

const ENVIRONMENT_CONFIGURATION = {
  API_URL: 'https://mediastore-sandbox.cleeng.com',
  ADYEN_CLIENT_KEY: 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K',
  REACT_ENV: 'sandbox'
};

export {
  Login,
  Register,
  OfferContainer,
  MyAccount,
  Config,
  Auth,
  ENVIRONMENT_CONFIGURATION,
  Card,
  Consents,
  store
};
