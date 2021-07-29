import fetchWithJWT from 'util/fetchHelper';

const updateOrder = (orderId, params) => {
  const url = `https://mediastoreapi-sandbox.cleeng.com/orders/${orderId}`;

  return fetchWithJWT(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params })
  }).then(res => res.json());
};

export default updateOrder;
