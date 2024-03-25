import { fetchWithHeaders } from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const registerCustomer = async (
  email,
  password,
  publisherId,
  locale,
  country,
  currency,
  reCAPTCHA
) => {
  const url = `${getApiURL()}/customers`;

  try {
    const resp = await fetchWithHeaders(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        publisherId,
        locale,
        country,
        currency
      }),
      headers: {
        'X-Recaptcha-Data': reCAPTCHA
      }
    });
    const json = await resp.json();
    return {
      status: resp.status,
      ...json
    };
  } catch (error) {
    return error;
  }
};

export default registerCustomer;
