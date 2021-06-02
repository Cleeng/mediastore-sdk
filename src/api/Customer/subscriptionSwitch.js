import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const subscriptionSwitch = async (offerId, toOfferId, switchDirection) => {
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/customers/${customerId}/subscription_switches/${offerId}`;
  return fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({
      toOfferId,
      switchDirection
    })
  }).then(res => {
    return res.json();
  });
};

export default subscriptionSwitch;
