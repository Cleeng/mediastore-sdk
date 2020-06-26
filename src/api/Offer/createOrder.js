import jwtDecode from 'jwt-decode';

const createOrder = offerId => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const customerIP = localStorage.getItem('CLEENG_CUSTOMER_IP') || '';

  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/orders`;
  const { customerId } = jwtDecode(token);

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      offerId,
      customerId,
      customerIP
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
};

export default createOrder;
