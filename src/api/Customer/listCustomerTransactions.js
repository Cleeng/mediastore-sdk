import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const listCustomerTransactions = async (limit = 50, offset = 0) => {
  const API_URL = getApiURL();
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

  const url = `${API_URL}/customers/${customerId}/transactions?limit=${limit}&offset=${offset}`;
  return fetchWithJWT(url, {
    method: 'GET'
  })
    .then(res => {
      return res.json();
    })
    .catch(err => err);
};

export default listCustomerTransactions;
