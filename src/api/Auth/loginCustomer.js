import { fetchWithHeaders } from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const loginCustomer = async (email, password, loginBy) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/auths`;

  try {
    const resp = await fetchWithHeaders(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        ...loginBy
      })
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

export default loginCustomer;
