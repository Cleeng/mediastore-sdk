import { getData } from 'util/appConfigHelper';

const submitPaymentWithoutDetails = async () => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);
  const status = 'captured';
  const paymentOperation = 'initial-payment';
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/payments`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ orderId, status, paymentOperation }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default submitPaymentWithoutDetails;
