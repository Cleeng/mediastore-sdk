import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const updateOrder = (orderId, params) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/orders/${orderId}`;

  return fetchWithJWT(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params })
  })
    .then(async res => {
      const { responseData, errors } = await res.json();
      if (!res.ok) {
        throw new Error(errors[0]);
      }
      return responseData;
    })
    .catch(err => {
      throw new Error(err);
    });
};

export default updateOrder;
