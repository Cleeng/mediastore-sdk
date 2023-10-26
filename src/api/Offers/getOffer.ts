import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import OfferV2 from 'types/OfferV2.types';

const getOffer = async (offerId: string): Promise<OfferV2> => {
  const API_URL = getApiURL();

  const url = `${API_URL}/v2/offers/${offerId}`;
  return fetchWithJWT(url, {
    method: 'GET'
  })
    .then(async res => {
      const { responseData, errors } = await res.json();
      if (!res.ok) {
        throw new Error(errors[0]);
      }
      return responseData;
    })
    .catch(err => {
      throw new Error(err);
    });
};

export default getOffer;
