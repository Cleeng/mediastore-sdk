import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const updateSwtich = pendingSwitchId => {
  const API_URL = getApiURL();

  const url = `${API_URL}/subscription_switches/${pendingSwitchId}`;

  return fetchWithJWT(url, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'cancelled' })
  }).then(res => res.json());
};

export default updateSwtich;
