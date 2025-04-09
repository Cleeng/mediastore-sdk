import { fetchWithHeaders } from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const resetPassword = async (customerEmail, resetUrl, publisherId = '') => {
  const API_URL = getApiURL();
  const url = `${API_URL}/customers/passwords`;
  try {
    const res = await fetchWithHeaders(url, {
      method: 'PUT',
      body: JSON.stringify({
        publisherId,
        customerEmail,
        resetUrl
      })
    });
    const json = await res.json();
    if (json.message) {
      return {
        ...json,
        errors: [json.message]
      };
    }
    return {
      status: res.status,
      ...json
    };
  } catch (error) {
    return {
      errors: [error.message]
    };
  }
};

export default resetPassword;
