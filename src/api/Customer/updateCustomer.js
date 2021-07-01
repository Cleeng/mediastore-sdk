import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const updateCustomer = params => {
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

  const url = `https://mediastoreapi-sandbox.cleeng.com/customers/${customerId}`;

  return fetchWithJWT(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params })
  }).then(res => res.json());
};

export default updateCustomer;
