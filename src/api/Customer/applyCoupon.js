import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const applyCoupon = async (subscriptionId, couponCode) => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/customers/${customerId}/subscriptions/${subscriptionId}`;

  const resp = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ couponCode }),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const json = await resp.json();

  return {
    status: resp.status,
    ...json
  };
};

export default applyCoupon;
