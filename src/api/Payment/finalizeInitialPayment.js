import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const finalizeInitialPayment = async (orderId, details) => {
  const API_URL = getApiURL();

  const url = `${API_URL}/connectors/adyen/initial-payment/finalize`;

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

export default finalizeInitialPayment;
