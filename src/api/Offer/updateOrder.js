import { getData } from 'util/appConfigHelper';

const updateOrder = (orderId, params) => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/orders/${orderId}`;

  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
};

export default updateOrder;
