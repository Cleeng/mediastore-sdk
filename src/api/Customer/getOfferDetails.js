import { getData } from 'util/appConfigHelper';
import { fetchWithHeaders } from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import getCustomer from './getCustomer';

const getOfferDetails = async offerId => {
  const API_URL = getApiURL();
  let customerEmail = getData('CLEENG_CUSTOMER_EMAIL') || null;

  if (!customerEmail) {
    const customerResponse = await getCustomer();
    if (customerResponse.responseData) {
      customerEmail = customerResponse.responseData.email;
    }
  }
  const url = `${API_URL}/offers/${offerId}/customers/${customerEmail}`;

  return fetchWithHeaders(url, {}).then(res => res.json());
};

export default getOfferDetails;
