import getApiURL from 'util/environmentHelper';

const getConsents = publisherId => {
  const API_URL = getApiURL();
  return fetch(`${API_URL}/publishers/${publisherId}/consents`, {
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
export default getConsents;
