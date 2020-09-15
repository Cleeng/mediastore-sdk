import { getData } from 'util/appConfigHelper';

const getOfferDetails = offerId => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const customerEmail = getData('CLEENG_CUSTOMER_EMAIL') || '';
  const customerIP = getData('CLEENG_CUSTOMER_IP') || '';
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/offers/${offerId}/customers/${customerEmail}?customerIP=${customerIP}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default getOfferDetails;
