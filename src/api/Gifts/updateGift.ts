import { DeliveryDetails } from 'redux/types';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

type ParamsType = { deliveryDetails: DeliveryDetails };

const updateGift = (giftId: number, params: ParamsType) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/gifts/${giftId}`;

  return fetchWithJWT(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params })
  })
    .then(async (res) => {
      const { responseData, errors } = await res.json();
      if (!res.ok) {
        throw new Error(errors[0]);
      }
      return responseData;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default updateGift;
