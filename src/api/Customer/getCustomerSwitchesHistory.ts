import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import { SwitchDetail } from 'appRedux/types';

const getCustomerSwitchesHistory = async (): Promise<SwitchDetail[]> => {
  const API_URL = getApiURL();

  const url = `${API_URL}/subscription_switches`;
  return fetchWithJWT(url, {
    method: 'GET'
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

export default getCustomerSwitchesHistory;
