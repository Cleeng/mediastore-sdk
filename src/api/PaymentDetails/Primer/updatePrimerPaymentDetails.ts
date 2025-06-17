import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const updatePrimerPaymentDetails = async (
  paymentMethodId: number,
  externalPaymentId: string
) => {
  const API_URL = getApiURL();

  const url = `${API_URL}/connectors/primer/payment-details`;

  const res = await fetchWithJWT(url, {
    method: 'PUT',
    body: JSON.stringify({
      paymentMethodId,
      externalPaymentId
    })
  });

  const { responseData, errors } = await res.json();

  if (!res.ok) {
    throw new Error(errors[0]);
  }

  return responseData;
};

export default updatePrimerPaymentDetails;
