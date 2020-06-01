const getOfferDetails = offerId => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const customerEmail = localStorage.getItem('CLEENG_CUSTOMER_EMAIL') || '';
  const customerIP = localStorage.getItem('CLEENG_CUSTOMER_IP') || '';
  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/offers/${offerId}/customers/${customerEmail}?customerIP=${customerIP}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default getOfferDetails;
