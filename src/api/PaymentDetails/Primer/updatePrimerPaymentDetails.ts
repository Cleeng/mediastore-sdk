import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import store from 'appRedux/store';

const updatePrimerPaymentDetails = async (primerPaymentMethodId: string) => {
  const API_URL = getApiURL();

  const url = `${API_URL}/connectors/primer/payment-details`;

  const {
    paymentMethods: { selectedPaymentMethod }
  } = store.getState();

  const res = await fetchWithJWT(url, {
    method: 'PUT',
    body: JSON.stringify({
      paymentMethodId: selectedPaymentMethod?.id,
      primerPaymentMethodId
    })
  });

  const { responseData, errors } = await res.json();

  if (!res.ok) {
    throw new Error(errors[0]);
  }

  return responseData;
};

export default updatePrimerPaymentDetails;
