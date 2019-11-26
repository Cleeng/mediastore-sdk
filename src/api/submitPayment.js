const submitPayment = async card => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const orderId = localStorage.getItem('CLEENG_ORDER_ID') || '';
  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/connectors/adyen/payments`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ orderId, card }),
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default submitPayment;
