import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const submitPayment = async card => {
  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);
  const url = `https://mediastoreapi-sandbox.cleeng.com/connectors/adyen/payments`;

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
