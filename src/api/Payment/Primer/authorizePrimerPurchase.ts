import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const authorizePrimerPurchase = async (
  externalPaymentId: string,
  orderId: number
) => {
  const API_URL = getApiURL();

  const url = `${API_URL}/connectors/primer/initial-purchase`;

  const res = await fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({
      orderId,
      externalPaymentId
    })
  });

  const { responseData, errors } = await res.json();

  if (!res.ok) {
    throw new Error(errors[0]);
  }

  return responseData;
};

export default authorizePrimerPurchase;
