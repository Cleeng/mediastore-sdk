import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const applyRetentionAction = async (offerId: string) => {
  const API_URL = getApiURL();

  const url = `${API_URL}/customers/retention_actions`;
  return fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({
      offerId
    })
  })
    .then(async (res) => {
      const { responseData, errors } = await res.json();
      if (!res.ok) {
        throw new Error(errors[0]);
      }
      return responseData;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default applyRetentionAction;
