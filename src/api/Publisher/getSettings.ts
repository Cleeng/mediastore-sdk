import { fetchWithHeaders } from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import SettingsType from 'types/Settings.types';

type SettingsRespType = {
  responseData: SettingsType;
  errors: string[];
};

const getSettings = (publisherId: string): Promise<SettingsType> => {
  const API_URL = getApiURL();

  return fetchWithHeaders(`${API_URL}/mediastore_settings/${publisherId}`, {
    method: 'GET'
  })
    .then(async res => {
      const { responseData, errors }: SettingsRespType = await res.json();
      if (!res.ok) {
        throw new Error(errors[0]);
      }
      return responseData;
    })
    .catch(err => {
      throw new Error(err);
    });
};

export default getSettings;
