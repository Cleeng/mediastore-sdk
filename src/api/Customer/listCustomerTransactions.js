import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const listCustomerTransactions = async (limit = 50, offset = 0) => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/customers/${customerId}/transactions?limit=${limit}&offset=${offset}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    return res.json();
  });
};

export default listCustomerTransactions;
