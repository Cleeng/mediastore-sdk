import { fetchWithHeaders } from 'util/fetchHelper';
import { sendMessage } from 'util/appConfigHelper';

const loginCustomer = async (email, password, loginBy) => {
  try {
    const resp = await fetchWithHeaders(
      `${ENVIRONMENT_CONFIGURATION.API_URL}/auths`,
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          ...loginBy
        })
      }
    );
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
