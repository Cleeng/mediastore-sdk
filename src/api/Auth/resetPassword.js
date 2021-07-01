import { fetchWithHeaders } from 'util/fetchHelper';

const resetPassword = async (offerId, customerEmail, publisherId = '') => {
  const url = `https://mediastoreapi-sandbox.cleeng.com/customers/passwords`;
  try {
    const res = await fetchWithHeaders(url, {
      method: 'PUT',
      body: JSON.stringify({ offerId, publisherId, customerEmail })
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
