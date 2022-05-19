import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const getOrder = orderId => {
  const API_URL = getApiURL();
  const url = `${API_URL}/orders/${orderId}`;

  return fetchWithJWT(url, {
    method: 'GET'
  }).then(res => res.json());
};

export default getOrder;
