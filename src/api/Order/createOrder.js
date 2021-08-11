import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const createOrder = (offerId, paymentMethodId = 0) => {
  const API_URL = getApiURL();
  const customerIP = getData('CLEENG_CUSTOMER_IP') || '';
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';
  const url = `${API_URL}/orders`;

  return fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({
      offerId,
      customerId,
      customerIP,
      paymentMethodId
    })
  }).then(res => res.json());
};

export default createOrder;
