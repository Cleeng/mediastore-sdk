import { JWT_TOKEN_LOCAL_STORAGE_KEY } from '../util/Constants';

const getOfferDetails = offerId => {
  const token = localStorage.getItem(JWT_TOKEN_LOCAL_STORAGE_KEY) || '';
  const url = ENVIRONMENT_CONFIGURATION.USE_API_MOCK
    ? `https://www.mocky.io/v2/5d935c0f3000006d001b746d?mocky-delay=100ms&offerId=${offerId}`
    : `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/offers/${offerId}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default getOfferDetails;
