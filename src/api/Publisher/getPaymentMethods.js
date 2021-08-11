import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const getPaymentMethods = () => {
  const API_URL = getApiURL();

  return fetchWithJWT(`${API_URL}/payment-methods`, {
    method: 'GET'
  }).then(res => res.json());
};

export default getPaymentMethods;
