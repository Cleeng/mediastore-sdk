import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const updateAdyenPaymentDetails = async (paymentMethodId, card) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/connectors/adyen/payment_details`;

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: JSON.stringify({ card, paymentMethodId })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default updateAdyenPaymentDetails;
