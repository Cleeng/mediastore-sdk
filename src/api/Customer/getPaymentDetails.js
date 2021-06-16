import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const getPaymentDetails = async () => {
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/customers/${customerId}/payment_details`;
  return fetchWithJWT(url, {
    method: 'GET'
  }).then(res => {
    return res.json();
  });
};

export default getPaymentDetails;
