import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../util/Constants';

const submitPayment = async (orderId, card) => {
  const token = localStorage.getItem(JWT_TOKEN_LOCAL_STORAGE_KEY) || '';
  const url = ENVIRONMENT_CONFIGURATION.USE_API_MOCK
    ? `https://www.mocky.io/v2/5da04f3d3000002d00f89d57?mocky-delay=100ms`
    : `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/3.1/submitPayment/`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ orderId, card }),
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.ok;
  } catch {
    return false;
  }
};

export default submitPayment;
