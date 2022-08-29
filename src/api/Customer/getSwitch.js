import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const getSwitch = async switchId => {
  const API_URL = getApiURL();

  const url = `${API_URL}/subscription_switches/${switchId}`;
  return fetchWithJWT(url, {
    method: 'GET'
  }).then(res => {
    return res.json();
  });
};

export default getSwitch;
