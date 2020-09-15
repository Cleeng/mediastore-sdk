import { getData } from 'util/appConfigHelper';

const submitPayPalPayment = async () => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/connectors/paypal/v1/tokens`;
  const redirectUrls = {
    successUrl:
      getData('CLEENG_PP_SUCCESS') || `${window.location.origin}/thankyou`,
    cancelUrl: getData('CLEENG_PP_CANCEL') || `${window.location.origin}/offer`,
    errorUrl: getData('CLEENG_PP_ERROR') || `${window.location.origin}/offer`
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ orderId, ...redirectUrls }),
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

export default submitPayPalPayment;
