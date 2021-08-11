import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const updateOrder = (orderId, params) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/orders/${orderId}`;

  return fetchWithJWT(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params })
  }).then(res => res.json());
};

export default updateOrder;
