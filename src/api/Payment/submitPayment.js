import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const submitPayment = async card => {
  const API_URL = getApiURL();

  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);
  const url = `${API_URL}/connectors/adyen/payments`;

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: JSON.stringify({ orderId, card })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default submitPayment;
