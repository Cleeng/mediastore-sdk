import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import { jwtDecode } from 'jwt-decode';

const applyCoupon = async (subscriptionId, couponCode) => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));

  const url = `${API_URL}/customers/${customerId}/subscriptions/${subscriptionId}`;

  const resp = await fetchWithJWT(url, {
    method: 'PATCH',
    body: JSON.stringify({ couponCode }),
  });

  const json = await resp.json();

  return {
    status: resp.status,
    ...json,
  };
};

export default applyCoupon;
