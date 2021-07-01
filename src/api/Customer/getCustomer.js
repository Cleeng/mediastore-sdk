import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const getCustomer = () => {
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

  const url = `https://mediastoreapi-sandbox.cleeng.com/customers/${customerId}`;
  return fetchWithJWT(url, {
    method: 'GET'
  }).then(res => res.json());
};

export default getCustomer;
