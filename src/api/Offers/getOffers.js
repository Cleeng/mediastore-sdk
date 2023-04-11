import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const getOffers = async () => {
  const API_URL = getApiURL();

  const url = `${API_URL}/offers?pageLimit=100`;
  return fetchWithJWT(url, {
    method: 'GET'
  })
    .then(async res => {
      const { responseData, errors } = await res.json();
      if (!res.ok) {
        throw new Error(errors[0]);
      }
      return responseData;
    })
    .catch(err => {
      throw new Error(err);
    });
};

export default getOffers;
