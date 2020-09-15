import { sendMessage } from 'util/appConfigHelper';

const registerCustomer = async (
  email,
  password,
  offerId,
  locale,
  country,
  currency
) => {
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/customers`;

  try {
    const resp = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        offerId,
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
