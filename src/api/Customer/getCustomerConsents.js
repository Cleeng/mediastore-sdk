import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const getCustomerConsents = async () => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `https://mediastoreapi-sandbox.cleeng.com/customers/${customerId}/consents`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    return res.json();
  });
};

export default getCustomerConsents;
