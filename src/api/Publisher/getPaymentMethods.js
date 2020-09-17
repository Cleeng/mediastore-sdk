import { getData } from 'util/appConfigHelper';

const getPaymentMethods = async () => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  return fetch(`${ENVIRONMENT_CONFIGURATION.API_URL}/payment-methods`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default getPaymentMethods;
