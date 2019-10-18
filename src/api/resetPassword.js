import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../util/Constants';

const applyCoupon = couponCode => {
  const token = localStorage.getItem(JWT_TOKEN_LOCAL_STORAGE_KEY) || '';
  const url = ENVIRONMENT_CONFIGURATION.USE_API_MOCK
    ? `https://www.mocky.io/v2/5da868b21200004411edaea9?mocky-delay=100ms`
    : `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/customers/:customerId/password`;

  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ couponCode }),
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default applyCoupon;
