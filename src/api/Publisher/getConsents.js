const getConsents = publisherId => {
  return fetch(
    `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/publishers/${publisherId}/consents`,
    {}
  ).then(res => res.json());
};

export default getConsents;
