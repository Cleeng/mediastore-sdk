import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import { VerifiedGift } from 'appRedux/types';

const redeemGift = async (giftCode: string): Promise<VerifiedGift> => {
  const API_URL = getApiURL();

  const url = `${API_URL}/gifts/redeem/${giftCode}`;
  return fetchWithJWT(url, {
    method: 'POST'
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

export default redeemGift;
