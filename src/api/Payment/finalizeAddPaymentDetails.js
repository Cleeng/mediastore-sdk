import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const finalizeAddPaymentDetails = async (orderId, details) => {
  const API_URL = getApiURL();

  const url = `${API_URL}/connectors/adyen/payment-details/finalize`;

  return fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({
      orderId,
      details
    })
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

export default finalizeAddPaymentDetails;
