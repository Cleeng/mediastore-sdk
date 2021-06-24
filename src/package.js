import Card from 'components/Card';
import Consents from 'components/Consents';
import OfferContainer from 'containers/OfferContainer';
import App from 'containers/App/App.container';

const ENVIRONMENT_CONFIGURATION = {
  API_URL: 'https://mediastore-sandbox.cleeng.com',
  ADYEN_CLIENT_KEY: 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K',
  REACT_ENV: 'sandbox'
};

export { ENVIRONMENT_CONFIGURATION, Card, Consents, OfferContainer, App };
