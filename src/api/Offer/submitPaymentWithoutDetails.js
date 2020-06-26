const submitPaymentWithoutDetails = async () => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const orderId = parseInt(localStorage.getItem('CLEENG_ORDER_ID') || '0', 10);
  const status = 'captured';
  const paymentOperation = 'initial-payment';
  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/payments`;

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
