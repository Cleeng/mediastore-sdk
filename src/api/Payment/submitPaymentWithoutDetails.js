import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const submitPaymentWithoutDetails = async (captchaValue) => {
  const API_URL = getApiURL();
  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);
  const url = `${API_URL}/payments`;

  return fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({ orderId, captchaValue })
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

export default submitPaymentWithoutDetails;
