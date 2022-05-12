import { fetchWithHeaders } from 'util/fetchHelper';
import { sendMessage } from 'util/appConfigHelper';
import getApiURL from 'util/environmentHelper';

const loginCustomer = async (email, password, loginBy, customerIP) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/auths`;

  try {
    const resp = await fetchWithHeaders(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        ...loginBy,
        ...(customerIP && { customerIP })
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
