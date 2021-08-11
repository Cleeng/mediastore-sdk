import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const getCustomer = () => {
  const API_URL = getApiURL();
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

  const url = `${API_URL}/customers/${customerId}`;
  return fetchWithJWT(url, {
    method: 'GET'
  }).then(res => res.json());
};

export default getCustomer;
