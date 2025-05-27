import { getData } from 'util/appConfigHelper';

const ENVIRONMENTS = {
  DEVELOPMENT: '',
  STAGING: 'https://hc0f1jaa70.execute-api.eu-west-1.amazonaws.com/staging',
  SANDBOX: 'https://mediastoreapi-sandbox.cleeng.com',
  PRODUCTION: 'https://mediastoreapi.cleeng.com'
};

const getApiURL = () => {
  const environment = getData('CLEENG_ENVIRONMENT');

  console.log('###### mssdk getApiUrl', {
    pureLocalStorageEnv: localStorage.getItem('CLEENG_ENVIRONMENT'),
    getDataEnv: environment,
    publisherIdPure: localStorage.getItem('CLEENG_PUBLISHER_ID'),
    publisherIdProper: getData('CLEENG_PUBLISHER_ID')
  });

  switch (environment) {
    case 'development':
      return ENVIRONMENTS.DEVELOPMENT;
    case 'staging':
      return ENVIRONMENTS.STAGING;
    case 'sandbox':
      return ENVIRONMENTS.SANDBOX;
    case 'production':
      return ENVIRONMENTS.PRODUCTION;
    default:
      return ENVIRONMENTS.SANDBOX;
  }
};

export default getApiURL;
