const getConsents = publisherId => {
  console.log(
    `${ENVIRONMENT_CONFIGURATION.API_URL}/publishers/${publisherId}/consents`
  );
  return fetch(
    `${ENVIRONMENT_CONFIGURATION.API_URL}/publishers/${publisherId}/consents`,
    { method: 'GET' }
  ).then(res => res.json());
};

export default getConsents;
