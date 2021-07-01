import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const createOrder = (offerId, paymentMethodId = 0) => {
  const customerIP = getData('CLEENG_CUSTOMER_IP') || '';
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';
  const url = `https://mediastoreapi-sandbox.cleeng.com/orders`;

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
