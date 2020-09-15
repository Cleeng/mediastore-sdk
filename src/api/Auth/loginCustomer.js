import { sendMessage } from 'util/appConfigHelper';

const loginCustomer = async (email, password, loginBy) => {
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/auths`;

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
        ...loginBy
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

export default loginCustomer;
