import fetchWithJWT from 'util/fetchHelper';

const updateOrder = (orderId, params) => {
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/orders/${orderId}`;

  return fetchWithJWT(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params })
  }).then(res => res.json());
};

export default updateOrder;
