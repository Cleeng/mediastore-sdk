import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';

const subscriptionSwitch = async (offerId, toOfferId, switchDirection) => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));

  const url = `${API_URL}/customers/${customerId}/subscription_switches/${offerId}`;
  return fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({
      toOfferId,
      switchDirection
    })
  }).then((res) => {
    return res.json();
  });
};

export default subscriptionSwitch;
