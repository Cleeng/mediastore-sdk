import { sendMessage } from 'util/appConfigHelper';
import { fetchWithHeaders } from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const registerCustomer = async (
  email,
  password,
  publisherId,
  locale,
  country,
  currency
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
      })
    });
    const json = await resp.json();
    sendMessage({
      ...json.responseData
    });
    return {
      status: resp.status,
      ...json
    };
  } catch (error) {
    return error;
  }
};

export default registerCustomer;
