const getOfferDetails = offerId => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const customerEmail = localStorage.getItem('CLEENG_CUSTOMER_EMAIL') || '';
  const url = ENVIRONMENT_CONFIGURATION.USE_API_MOCK
    ? `https://www.mocky.io/v2/5d935c0f3000006d001b746d?mocky-delay=100ms&offerId=${offerId}`
    : `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/offers/${offerId}/customers/${customerEmail}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default getOfferDetails;
