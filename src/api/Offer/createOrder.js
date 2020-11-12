import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const createOrder = (offerId, paymentMethodId = 0) => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const customerIP = getData('CLEENG_CUSTOMER_IP') || '';

  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/orders`;
  const { customerId } = jwtDecode(token);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      offerId,
      customerId,
      customerIP,
      paymentMethodId
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
};

export default createOrder;
