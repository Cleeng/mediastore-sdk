import fetchWithJWT from 'util/fetchHelper';

const getPaymentMethods = () => {
  return fetchWithJWT(`${ENVIRONMENT_CONFIGURATION.API_URL}/payment-methods`, {
    method: 'GET'
  }).then(res => res.json());
};

export default getPaymentMethods;
