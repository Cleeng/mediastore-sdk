import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const createPaymentSession = async isMyAccount => {
  const API_URL = getApiURL();

  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);

  const url = `${API_URL}/connectors/adyen/sessions`;

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: isMyAccount
        ? JSON.stringify({ returnUrl: 'https://cleeng.com' })
        : JSON.stringify({ orderId, returnUrl: 'https://cleeng.com' })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default createPaymentSession;
