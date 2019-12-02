const getConsents = offerId => {
  return fetch(
    `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/offers/${offerId}/consents`,
    {}
  ).then(res => res.json());
};

export default getConsents;
