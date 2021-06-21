import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const updateSubscription = params => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `https://mediastore-sandbox.cleeng.com/customers/${customerId}/subscriptions`;

  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
};

export default updateSubscription;
