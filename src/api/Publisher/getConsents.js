const getConsents = publisherId => {
  return fetch(
    `${ENVIRONMENT_CONFIGURATION.API_URL}/publishers/${publisherId}/consents`,
    { method: 'GET' }
  ).then(res => res.json());
};

export default getConsents;
