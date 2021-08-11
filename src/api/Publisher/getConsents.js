import getApiURL from 'util/environmentHelper';

const getConsents = publisherId => {
  const API_URL = getApiURL();
  return fetch(`${API_URL}/publishers/${publisherId}/consents`, {
    method: 'GET'
  }).then(res => res.json());
};
export default getConsents;
