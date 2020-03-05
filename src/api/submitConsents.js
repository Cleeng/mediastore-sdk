import jwtDecode from 'jwt-decode';

const submitConsents = async (consents, consentDefinitions) => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const { customerId } = jwtDecode(token);
  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/customers/${customerId}/consents`;
  const consentsPayload = consentDefinitions.map((consentDefinition, index) => {
    return {
      name: consentDefinition.name,
      version: consentDefinition.version,
      state: consents[index] ? 'accepted' : 'declined'
    };
  });
  try {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ consents: consentsPayload }),
      headers: {
        Authorization: `Bearer ${token}`
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
