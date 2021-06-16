import { getData } from 'util/appConfigHelper';
import { fetchWithHeaders } from 'util/fetchHelper';

const getOfferDetails = offerId => {
  const customerEmail = getData('CLEENG_CUSTOMER_EMAIL') || '';
  const customerIP = getData('CLEENG_CUSTOMER_IP') || '';
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/offers/${offerId}/customers/${customerEmail}?customerIP=${customerIP}`;

  return fetchWithHeaders(url, {}).then(res => res.json());
};

export default getOfferDetails;
