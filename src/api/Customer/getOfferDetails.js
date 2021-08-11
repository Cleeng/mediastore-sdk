import { getData } from 'util/appConfigHelper';
import { fetchWithHeaders } from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const getOfferDetails = offerId => {
  const API_URL = getApiURL();
  const customerEmail = getData('CLEENG_CUSTOMER_EMAIL') || '';
  const customerIP = getData('CLEENG_CUSTOMER_IP') || '';
  const url = `${API_URL}/offers/${offerId}/customers/${customerEmail}?customerIP=${customerIP}`;

  return fetchWithHeaders(url, {}).then(res => res.json());
};

export default getOfferDetails;
