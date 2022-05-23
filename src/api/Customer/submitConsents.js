import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';

const submitConsents = async (consents, consentDefinitions, payload = null) => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));

  const url = `${API_URL}/customers/${customerId}/consents`;
  let consentsPayload;
  if (!payload) {
    consentsPayload = consentDefinitions.map((consentDefinition, index) => {
      return {
        name: consentDefinition.name,
        version: consentDefinition.version,
        state: consents[index] ? 'accepted' : 'declined'
      };
    });
  } else {
    consentsPayload = payload;
  }

  try {
    const res = await fetchWithJWT(url, {
      method: 'PUT',
      body: JSON.stringify({ consents: consentsPayload })
    });
    const json = await res.json();
    return json;
  } catch (error) {
    return {
      errors: [error.message]
    };
  }
};

export default submitConsents;
