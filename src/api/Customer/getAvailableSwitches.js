import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';

const getAvailableSwitches = async offerId => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));

  const url = `${API_URL}/customers/${customerId}/subscription_switches/${offerId}/availability`;
  return fetchWithJWT(url, {
    method: 'GET'
  }).then(requestRes => {
    return requestRes.json().then(data => ({
      response: data,
      status: requestRes.status
    }));
  });
};

export default getAvailableSwitches;
