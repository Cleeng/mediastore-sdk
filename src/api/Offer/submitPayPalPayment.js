const submitPayPalPayment = async () => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const orderId = parseInt(localStorage.getItem('CLEENG_ORDER_ID') || '0', 10);
  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/connectors/paypal/v1/tokens`;
  const redirectUrls = {
    successUrl: `${window.location.origin}/thankyou`,
    cancelUrl: `${window.location.origin}/offer`,
    errorUrl: `${window.location.origin}/offer`
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
