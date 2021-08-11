import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const getPaymentDetails = async () => {
  const API_URL = getApiURL();
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

  const url = `${API_URL}/customers/${customerId}/payment_details`;
  return fetchWithJWT(url, {
    method: 'GET'
  }).then(res => {
    return res.json();
  });
};

export default getPaymentDetails;
