import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const submitPaymentWithoutDetails = async () => {
  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);
  const status = 'captured';
  const paymentOperation = 'initial-payment';
  const url = `https://mediastoreapi-sandbox.cleeng.com/payments`;

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: JSON.stringify({ orderId, status, paymentOperation })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default submitPaymentWithoutDetails;
