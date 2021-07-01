import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const getAvailableSwitches = async offerId => {
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

  const url = `https://mediastoreapi-sandbox.cleeng.com/customers/${customerId}/subscription_switches/${offerId}/availability`;
  return fetchWithJWT(url, {
    method: 'GET'
  }).then(res => {
    return res.json();
  });
};

export default getAvailableSwitches;
