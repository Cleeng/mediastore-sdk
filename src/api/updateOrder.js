const updateOrder = (orderId, params) => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/orders/${orderId}`;

  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params }),
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default updateOrder;
