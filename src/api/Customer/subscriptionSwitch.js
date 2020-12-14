import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const subscriptionSwitch = async (offerId, toOfferId, switchDirection) => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/customers/${customerId}/subscription_switches/${offerId}`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      toOfferId,
      switchDirection
    }),
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    return res.json();
  });
};

export default subscriptionSwitch;
