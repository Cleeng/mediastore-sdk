import { getData } from 'util/appConfigHelper';

const submitPayment = async card => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/connectors/adyen/payments`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ orderId, card }),
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

export default submitPayment;
