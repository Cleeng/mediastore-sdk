import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const updateCustomer = params => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `http://sls.cleeng.com:8000/mediastore-api/customers/${customerId}`;

  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
};

export default updateCustomer;
