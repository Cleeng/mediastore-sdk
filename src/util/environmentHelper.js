import { getData } from 'util/appConfigHelper';

const ENVIRONMENTS = {
  DEVELOPMENT: '',
  STAGING: 'https://hc0f1jaa70.execute-api.eu-west-1.amazonaws.com/staging',
  STAGING2: 'https://mediastoreapi-staging2.stardustlab.com',
  SANDBOX: 'https://mediastoreapi-sandbox.cleeng.com',
  PRODUCTION: 'https://mediastoreapi.cleeng.com'
};

const getApiURL = () => {
  const environment = getData('CLEENG_ENVIRONMENT');
  switch (environment) {
    case 'development':
      return ENVIRONMENTS.DEVELOPMENT;
    case 'staging':
      return ENVIRONMENTS.STAGING;
    case 'staging2':
      return ENVIRONMENTS.STAGING2;
    case 'sandbox':
      return ENVIRONMENTS.SANDBOX;
    case 'production':
      return ENVIRONMENTS.PRODUCTION;
    default:
      return ENVIRONMENTS.SANDBOX;
  }
};

export default getApiURL;
