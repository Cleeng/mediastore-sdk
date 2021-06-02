import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';

const submitConsents = async (consents, consentDefinitions, payload = null) => {
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';

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
