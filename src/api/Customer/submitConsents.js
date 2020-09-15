import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const submitConsents = async (consents, consentDefinitions, payload = null) => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const { customerId } = jwtDecode(token);
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/customers/${customerId}/consents`;
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
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ consents: consentsPayload }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
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
