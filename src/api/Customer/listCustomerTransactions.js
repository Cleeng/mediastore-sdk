import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const listCustomerTransactions = async (limit = 50, offset = 0) => {
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/customers/${customerId}/transactions?limit=${limit}&offset=${offset}`;
  return fetchWithJWT(url, {
    method: 'GET'
  })
    .then(res => {
      return res.json();
    })
    .catch(err => err);
};

export default listCustomerTransactions;
